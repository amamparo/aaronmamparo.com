import { getPublishedBlogPosts } from '../util/serverSideBlogUtils'

export async function load() {
	return {
		blogPosts: await getPublishedBlogPosts()
	}
}
