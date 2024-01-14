import { error, type NumericRange } from '@sveltejs/kit'
import type { BlogPost, BlogPostMetadata } from '$lib/blog'

export async function load({ params, parent, fetch }) {
	const { slug } = params
	const { blogPostMetadatas } = await parent()
	const blogPostMetadata = blogPostMetadatas.find((x: BlogPostMetadata) => x.slug === slug)
	if (!blogPostMetadata) {
		error(404)
	}
	const contentResponse = await fetch(blogPostMetadata.location as string)
	if (contentResponse.status >= 400 && contentResponse.status <= 599) {
		error(contentResponse.status as NumericRange<400, 599>)
	}
	return {
		metadata: blogPostMetadata,
		content: await contentResponse.text()
	} as BlogPost
}
