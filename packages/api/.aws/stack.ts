import { App, RemovalPolicy, Stack } from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { Platform } from 'aws-cdk-lib/aws-ecr-assets'
import { AssetImage } from 'aws-cdk-lib/aws-ecs'
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns'
import { HostedZone } from 'aws-cdk-lib/aws-route53'
import { Bucket } from 'aws-cdk-lib/aws-s3'
import path from 'path'

class Api extends Stack {
	constructor(scope: App) {
		super(scope, 'api-aaronmamparo-com')

		const bucket = new Bucket(this, 'blog-bucket', {
			removalPolicy: RemovalPolicy.DESTROY
		})

		// const port = 8080
		// new ApplicationLoadBalancedFargateService(this, 'service', {
		// 	cpu: 256,
		// 	memoryLimitMiB: 512,
		// 	desiredCount: 1,
		// 	domainName: 'api.aaronmamparo.com',
		// 	domainZone: HostedZone.fromHostedZoneAttributes(this, 'hosted-zone', {
		// 		hostedZoneId: 'Z00782283KN9B57P6J7Z0',
		// 		zoneName: 'aaronmamparo.com'
		// 	}),
		// 	certificate: Certificate.fromCertificateArn(this, 'certificate',
		// 		'arn:aws:acm:us-east-1:388646735826:certificate/d4a83e58-baff-48b1-94e8-13a214184f81'),
		// 	taskImageOptions: {
		// 		image: AssetImage.fromAsset(
		// 			path.join(__dirname, '..', '..', 'api'),
		// 			{
		// 				platform: Platform.LINUX_AMD64
		// 			}
		// 		),
		// 		environment: {
		// 			PORT: port.toString()
		// 		},
		// 		enableLogging: true,
		// 		containerPort: port
		// 	}
		// })
	}
}

const app = new App()
new Api(app)
app.synth()