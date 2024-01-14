import type { BlogPostMetadata } from '$lib/blog'

export async function load({ fetch }) {
	return {
		blogPostMetadatas: (await (
			await fetch('/_blog/publish/index.json')
		).json()) as BlogPostMetadata[]
	}
}
