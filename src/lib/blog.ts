import { env } from '$env/dynamic/public'

export type BlogPost = {
	slug: string
	date: string
	title: string
	s3Key: string
	tags: string[]
	content: string
}

export async function fetchBlogIndex(): Promise<BlogPost[]> {
	const response = await fetch(`${env.PUBLIC_BLOG_BUCKET_URL}/index.json`)
	return await response.json()
}
