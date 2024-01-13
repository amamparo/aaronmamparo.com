import { Duration, RemovalPolicy, Size, Stack } from 'aws-cdk-lib'
import { Platform } from 'aws-cdk-lib/aws-ecr-assets'
import { BlockPublicAccess, Bucket, EventType, HttpMethods } from 'aws-cdk-lib/aws-s3'
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda'
import { ARecord, type IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { User } from 'aws-cdk-lib/aws-iam'
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications'
import * as path from 'path'
import { Construct } from 'constructs'
import {
	CloudFrontWebDistribution,
	type IDistribution,
	ViewerCertificate
} from 'aws-cdk-lib/aws-cloudfront'
import type { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'

export default class Blog extends Construct {
	constructor(
		scope: Stack,
		certificate: ICertificate,
		hostedZone: IHostedZone,
		blogDomainName: string,
		websiteDistribution: IDistribution
	) {
		super(scope, 'blog')

		const obsidianUploader = new User(this, 'uploader')

		const bucket = new Bucket(this, 'bucket', {
			bucketName: blogDomainName,
			websiteIndexDocument: 'index.json',
			publicReadAccess: true,
			blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
			cors: [
				{
					allowedHeaders: ['*'],
					allowedMethods: [HttpMethods.GET],
					allowedOrigins: ['*'],
					exposedHeaders: ['ETag']
				}
			],
			removalPolicy: RemovalPolicy.DESTROY
		})

		const indexBlogFunction = new DockerImageFunction(this, 'index-function', {
			code: DockerImageCode.fromImageAsset(path.join(__dirname, '..', 'packages', 'blog'), {
				platform: Platform.LINUX_AMD64
			}),
			reservedConcurrentExecutions: 1,
			timeout: Duration.minutes(15),
			ephemeralStorageSize: Size.gibibytes(0.5),
			memorySize: 256,
			environment: {
				BUCKET_NAME: bucket.bucketName,
				WEBSITE_DISTRIBUTION_ID: websiteDistribution.distributionId
			}
		})

		const indexBlogDestination = new LambdaDestination(indexBlogFunction)
		;[EventType.OBJECT_CREATED, EventType.OBJECT_REMOVED].forEach((eventType) => {
			bucket.addEventNotification(eventType, indexBlogDestination, { suffix: '.md' })
		})

		const distribution = new CloudFrontWebDistribution(this, 'distribution', {
			originConfigs: [
				{
					s3OriginSource: { s3BucketSource: bucket },
					behaviors: [
						{
							maxTtl: Duration.seconds(0),
							defaultTtl: Duration.seconds(0),
							isDefaultBehavior: true
						}
					]
				}
			],
			viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
				aliases: [blogDomainName]
			})
		})

		new ARecord(this, 'a-record', {
			zone: hostedZone,
			recordName: blogDomainName,
			target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
		})

		bucket.grantReadWrite(obsidianUploader)
		bucket.grantReadWrite(indexBlogFunction)
		websiteDistribution.grantCreateInvalidation(indexBlogFunction)
	}
}
