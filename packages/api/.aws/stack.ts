import { App, Duration, RemovalPolicy, Size, Stack } from 'aws-cdk-lib'
import { Platform } from 'aws-cdk-lib/aws-ecr-assets'
import { Bucket, EventType } from 'aws-cdk-lib/aws-s3'
import path from 'path'
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda'
import { EndpointType, LambdaRestApi } from 'aws-cdk-lib/aws-apigateway'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53'
import { ApiGateway } from 'aws-cdk-lib/aws-route53-targets'
import { User } from 'aws-cdk-lib/aws-iam'
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications'

const account = process.env.CDK_DEFAULT_ACCOUNT
const region = process.env.CDK_DEFAULT_REGION

class Api extends Stack {
	constructor(scope: App) {
		super(scope, 'api-aaronmamparo-com', { env: { account, region } })

		const bucket = new Bucket(this, 'blog-bucket', {
			removalPolicy: RemovalPolicy.DESTROY
		})

		const bucketUploader = new User(this, 'upload-user')
		bucket.grantReadWrite(bucketUploader)

		const blogTable = new Table(this, 'blog-table', {
			partitionKey: {
				name: 'slug',
				type: AttributeType.STRING
			},
			billingMode: BillingMode.PAY_PER_REQUEST,
			removalPolicy: RemovalPolicy.DESTROY,
			deletionProtection: false
		})

		const indexBlogFunction = new DockerImageFunction(this, 'index-blog-function', {
			code: DockerImageCode.fromImageAsset(path.join(__dirname, '..'), {
				platform: Platform.LINUX_AMD64,
				buildArgs: {
					HANDLER_FILE: 'src/indexBlog.ts'
				}
			}),
			reservedConcurrentExecutions: 1,
			timeout: Duration.minutes(15),
			ephemeralStorageSize: Size.gibibytes(0.5),
			memorySize: 256,
			environment: {
				BUCKET_NAME: bucket.bucketName,
				TABLE_NAME: blogTable.tableName
			}
		})

		bucket.grantRead(indexBlogFunction)
		blogTable.grantReadWriteData(indexBlogFunction)
		bucket.addEventNotification(EventType.OBJECT_CREATED, new LambdaDestination(indexBlogFunction));


		const restApi = new LambdaRestApi(this, 'api', {
			handler: new DockerImageFunction(this, 'api-function', {
				code: DockerImageCode.fromImageAsset(path.join(__dirname, '..'), {
					platform: Platform.LINUX_AMD64,
					buildArgs: {
						HANDLER_FILE: 'src/api.ts'
					}
				}),
				timeout: Duration.seconds(5),
				ephemeralStorageSize: Size.gibibytes(0.5),
				memorySize: 512
			}),
			proxy: true,
			deploy: true,
			disableExecuteApiEndpoint: false,
			domainName: {
				domainName: 'api.aaronmamparo.com',
				endpointType: EndpointType.EDGE,
				certificate: Certificate.fromCertificateArn(
					this,
					'certificate',
					'arn:aws:acm:us-east-1:388646735826:certificate/d4a83e58-baff-48b1-94e8-13a214184f81'
				)
			}
		})

		new ARecord(this, 'a-record', {
			zone: HostedZone.fromLookup(this, 'hosted-zone', {
				domainName: 'aaronmamparo.com'
			}),
			recordName: 'api',
			target: RecordTarget.fromAlias(new ApiGateway(restApi))
		})
	}
}

const app = new App()
new Api(app)
app.synth()