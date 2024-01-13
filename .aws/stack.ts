import { App, Stack } from 'aws-cdk-lib'
import Blog from './blog'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns'
import { AssetImage } from 'aws-cdk-lib/aws-ecs'
import * as path from 'path'
import { Platform } from 'aws-cdk-lib/aws-ecr-assets'
import { HostedZone } from 'aws-cdk-lib/aws-route53'

const account = process.env.CDK_DEFAULT_ACCOUNT
const region = process.env.CDK_DEFAULT_REGION

class Website extends Stack {
	constructor(scope: App) {
		super(scope, 'aaronmamparo-com', { env: { account, region } })
		const domainName = 'aaronmamparo.com'

		const hostedZone = HostedZone.fromLookup(this, 'hosted-zone', { domainName })

		const certificate = Certificate.fromCertificateArn(
			this,
			'certificate',
			`arn:aws:acm:${region}:${account}:certificate/d4a83e58-baff-48b1-94e8-13a214184f81`
		)

		const port = 3000
		new ApplicationLoadBalancedFargateService(this, 'service', {
			cpu: 256,
			memoryLimitMiB: 512,
			desiredCount: 1,
			taskImageOptions: {
				image: AssetImage.fromAsset(path.join(__dirname, '..'), {
					platform: Platform.LINUX_AMD64
				}),
				enableLogging: true,
				containerPort: port,
				environment: {
					PORT: port.toString(),
					ORIGIN: `https://${domainName}`
				}
			},
			domainName,
			domainZone: hostedZone,
			certificate
		})

		new Blog(this, certificate, hostedZone, domainName)
	}
}

const app = new App()
new Website(app)
app.synth()