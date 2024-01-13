import { Duration, RemovalPolicy, Size, Stack } from 'aws-cdk-lib'
import { Platform } from 'aws-cdk-lib/aws-ecr-assets'
import { BlockPublicAccess, Bucket, EventType, HttpMethods } from 'aws-cdk-lib/aws-s3'
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda'
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ARecord, HostedZone, IHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { User } from 'aws-cdk-lib/aws-iam'
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications'
import * as path from 'path'
import { Construct } from 'constructs'
import { CloudFrontWebDistribution, ViewerCertificate } from 'aws-cdk-lib/aws-cloudfront'

export default class Blog extends Construct {
	constructor(
		scope: Stack,
		certificate: ICertificate,
		hostedZone: IHostedZone,
		domainName: string
	) {
		super(scope, 'blog')
		const subDomain = 'blog'
		const blogDomain = `${subDomain}.${domainName}`

		const obsidianUploader = new User(this, 'obsidian-uploader')

		const bucket = new Bucket(this, 'bucket', {
			bucketName: blogDomain,
			websiteIndexDocument: 'index.json',
			publicReadAccess: true,
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
				BUCKET_NAME: bucket.bucketName
			}
		})

		const indexBlogDestination = new LambdaDestination(indexBlogFunction)
		;[EventType.OBJECT_CREATED, EventType.OBJECT_REMOVED].forEach((eventType) => {
			bucket.addEventNotification(eventType, indexBlogDestination, { suffix: '.md' })
		})

		const distribution = new CloudFrontWebDistribution(this, 'distribution', {
			originConfigs: [
				{
					s3OriginSource: {
						s3BucketSource: bucket
					},
					behaviors: [{ isDefaultBehavior: true }]
				}
			],
			viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
				aliases: [blogDomain]
			})
		})

		new ARecord(this, 'a-record', {
			zone: hostedZone,
			recordName: subDomain,
			target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
		})

		bucket.grantReadWrite(obsidianUploader)
		bucket.grantReadWrite(indexBlogFunction)
	}
}
