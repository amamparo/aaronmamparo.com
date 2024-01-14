import { App, Duration, RemovalPolicy, Stack } from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import {
	CloudFrontWebDistribution,
	OriginAccessIdentity,
	ViewerCertificate
} from 'aws-cdk-lib/aws-cloudfront'
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets'
import { BlockPublicAccess, Bucket, HttpMethods } from 'aws-cdk-lib/aws-s3'

const account = process.env.CDK_DEFAULT_ACCOUNT
const region = process.env.CDK_DEFAULT_REGION

class Website extends Stack {
	constructor(scope: App) {
		super(scope, 'aaronmamparo-com', { env: { account, region } })
		const domainName = 'aaronmamparo.com'

		const bucket = new Bucket(this, 'bucket', {
			bucketName: domainName,
			websiteIndexDocument: 'index.html',
			publicReadAccess: true,
			blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
			cors: [
				{
					allowedHeaders: ['*'],
					allowedMethods: [HttpMethods.GET],
					allowedOrigins: ['*']
				}
			],
			removalPolicy: RemovalPolicy.DESTROY,
			autoDeleteObjects: true
		})

		bucket.grantRead(new OriginAccessIdentity(this, 'origin-access-identity'))

		const distribution = new CloudFrontWebDistribution(this, 'distribution', {
			originConfigs: [
				{
					s3OriginSource: {
						s3BucketSource: bucket
					},
					behaviors: [
						{
							isDefaultBehavior: true,
							maxTtl: Duration.days(365),
							defaultTtl: Duration.days(365),
							compress: true
						}
					]
				}
			],
			viewerCertificate: ViewerCertificate.fromAcmCertificate(
				Certificate.fromCertificateArn(
					this,
					'certificate',
					`arn:aws:acm:${region}:${account}:certificate/d4a83e58-baff-48b1-94e8-13a214184f81`
				),
				{
					aliases: [domainName]
				}
			),
			defaultRootObject: 'index.html'
		})

		new ARecord(this, 'a-record', {
			zone: HostedZone.fromLookup(this, 'hosted-zone', { domainName }),
			recordName: domainName,
			target: RecordTarget.fromAlias(new CloudFrontTarget(distribution))
		})
	}
}

const app = new App()
new Website(app)
app.synth()
