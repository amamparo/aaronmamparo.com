import { GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'


const getTags = (markdown: string): string[] => {
	const unique = new Set<string>()
	let matches = markdown.match(/#([a-zA-Z0-9]+)/g) as string[]
	if (matches) {
		matches = matches.map(match => match.toLowerCase().substring(1))
		matches.forEach(match => unique.add(match))
	}
	return [...unique].toSorted()
}

await (async () => {
	const bucketName = process.env.BUCKET_NAME as string

	const s3 = new S3Client()

	const data = await s3.send(new ListObjectsCommand({ Bucket: bucketName }))
	if (!data.Contents) {
		return
	}

	const matches = data.Contents.filter(({ Key }) => /^(\d{4}-\d{2}-\d{2} .+\.md)$/.test(Key as string))
	const items = await Promise.all(matches.map(async ({ Key }) => {
		const object = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key }))
		const body = await object.Body?.transformToString() as string
		const [_, date, title] = (Key as string).match(/^(\d{4}-\d{2}-\d{2}) (.+)\.md$/) as string[]
		const slug = `${date}-${title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`
		return {
			slug,
			date,
			title,
			s3Key: Key as string,
			tags: getTags(body)
		}
	}))

	await s3.send(new PutObjectCommand({
		Bucket: bucketName,
		Key: 'index.json',
		Body: JSON.stringify(items)
	}))
})()

