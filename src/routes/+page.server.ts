import { getBlogPosts } from '$lib/blog'

export async function load() {
	return {
		blogPosts: await getBlogPosts()
	}
}
