import { getBlogPostsFor } from '../../../util/serverSideBlogUtils'

export async function load({ params }) {
	const { tag } = params
	return {
		tag,
		blogPosts: await getBlogPostsFor(tag)
	}
}
