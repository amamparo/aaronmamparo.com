import wrap from './lambda.ts'
import { GetObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3'
import { BatchWriteItemCommand, DynamoDBClient, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

const bucketName = process.env.BUCKET_NAME as string
const tableName = process.env.TABLE_NAME as string

const s3 = new S3Client()
const dynamoDb = new DynamoDBClient()

const getTags = (markdown: string): Set<string> => {
	const unique = new Set<string>()
	let matches = markdown.match(/#([a-zA-Z0-9]+)/g) as string[]
	if (matches) {
		matches = matches.map(match => match.toLowerCase().substring(1))
		matches.forEach(match => unique.add(match))
	}
	return unique
}

const update = async (items: any[]) => Promise.all(items.map(async (item) => {
	const keyObj = { slug: item.slug }
	const nonKeyObj = { ...item } as any
	delete nonKeyObj.slug

	const nonKeyKeys = Object.entries(nonKeyObj).filter(([_, value]) => value !== undefined).map(([key]) => key)

	const updateExpression = 'SET ' + nonKeyKeys.map(key => `#${key}=:${key}`).join(', ')
	const expressionAttributeNames = nonKeyKeys
		.reduce((prev, current) => ({
				...prev,
				[`#${current}`]: current
			}),
			{}
		)
	const expressionAttributeValues = Object.entries(nonKeyObj)
		.filter(([_, value]) => value !== undefined)
		.reduce((prev, current) => ({
				...prev,
				[`:${current[0]}`]: marshall(current[1], { convertEmptyValues: true })
			}),
			{}
		)

	await dynamoDb.send(new UpdateItemCommand({
		TableName: tableName,
		Key: marshall(keyObj, { convertEmptyValues: true }),
		UpdateExpression: updateExpression,
		ExpressionAttributeNames: expressionAttributeNames,
		ExpressionAttributeValues: expressionAttributeValues
	}))
}))

await wrap(async () => {
	const data = await s3.send(new ListObjectsCommand({ Bucket: bucketName }))
	if (!data.Contents) {
		return
	}

	const scanned = await dynamoDb.send(new ScanCommand({ TableName: tableName }))
	const slugsToDelete = new Set<string>(scanned.Items?.map(item => unmarshall(item)).map(({ slug }) => slug))

	const matches = data.Contents.filter(({ Key }) => /^(\d{4}-\d{2}-\d{2} .+\.md)$/.test(Key as string))
	const items = await Promise.all(
		matches.map(async ({ Key }) => {
			const object = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key }))
			const body = await object.Body?.transformToString() as string
			const [_, date, title] = (Key as string).match(/^(\d{4}-\d{2}-\d{2}) (.+)\.md$/) as string[]
			const slug = `${date}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`
			slugsToDelete.delete(slug)
			return {
				slug,
				date,
				title,
				s3Key: Key as string,
				tags: getTags(body)
			}
		})
	)
	await update(items)

	if (slugsToDelete.size > 0) {
		await dynamoDb.send(new BatchWriteItemCommand({
			RequestItems: {
				[tableName]: Array.from(slugsToDelete).map(slug => ({
					DeleteRequest: {
						Key: marshall({ slug })
					}
				}))
			}
		}))
	}
})