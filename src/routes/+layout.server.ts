import { env } from '$env/dynamic/public'

export type BlogPost = {
	slug: string
	date: string
	title: string
	s3Key: string
	tags: string[]
}

export async function load() {
	const res = await fetch(`${env.PUBLIC_BLOG_BUCKET_URL}/index.json`)
	const blogPosts = (await res.json()) as BlogPost[]
	return {
		blogPosts
	}
}
