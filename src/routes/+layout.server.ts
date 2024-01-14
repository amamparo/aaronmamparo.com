import type { BlogPostMetadata } from '$lib/blog'

export const prerender = true
export const trailingSlash = 'always'

export async function load({ fetch }) {
	return {
		blogPostMetadatas: (await (
			await fetch('/_blog/publish/index.json')
		).json()) as BlogPostMetadata[]
	}
}
