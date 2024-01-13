import { fetchBlogIndex } from '$lib/blog'

export async function load() {
	return {
		blogPosts: await fetchBlogIndex()
	}
}
