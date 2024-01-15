import { getBlogPosts } from '../util/serverSideBlogUtils'

export async function load() {
	return {
		blogPosts: await getBlogPosts()
	}
}
