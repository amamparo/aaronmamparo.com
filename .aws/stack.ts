import { App, Stack } from 'aws-cdk-lib'
import Blog from './blog'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'

const account = process.env.CDK_DEFAULT_ACCOUNT
const region = process.env.CDK_DEFAULT_REGION

class Website extends Stack {
	constructor(scope: App) {
		super(scope, 'aaronmamparo-com', { env: { account, region } })
		const certificate = Certificate.fromCertificateArn(
			this,
			'certificate',
			`arn:aws:acm:${region}:${account}:certificate/d4a83e58-baff-48b1-94e8-13a214184f81`
		)
		new Blog(this, certificate)
	}
}

const app = new App()
new Website(app)
app.synth()