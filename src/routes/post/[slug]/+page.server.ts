import { env } from '$env/dynamic/public'
import { error, type NumericRange } from '@sveltejs/kit'

export async function load({ params, parent }) {
	const { slug } = params
	const { blogPosts } = await parent()
	const blogPost = blogPosts.find((x) => x.slug === slug)
	if (!blogPost) {
		error(404)
	}
	const res = await fetch(`${env.PUBLIC_BLOG_BUCKET_URL}/${blogPost.s3Key}`)
	if (res.status >= 400 && res.status <= 599) {
		error(res.status as NumericRange<400, 599>)
	}
	return {
		...blogPost,
		content: await res.text()
	}
}
