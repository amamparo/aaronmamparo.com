import { getBlogPosts } from '$lib/blog'

export const prerender = true
export const trailingSlash = 'always'

export async function load() {
	return {
		blogPosts: await getBlogPosts()
	}
}
