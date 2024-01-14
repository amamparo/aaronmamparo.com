import { getDraftBlogPosts } from '../../util/serverSideBlogUtils'

export async function load() {
	return {
		blogPosts: await getDraftBlogPosts()
	}
}
