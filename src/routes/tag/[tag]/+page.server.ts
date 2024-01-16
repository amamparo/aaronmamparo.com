import { getTaggedBlogPosts } from '../../../util/serverSideBlogUtils'

export const prerender = 'auto'

export async function load({ params }) {
	const { tag } = params
	return {
		tag,
		blogPosts: await getTaggedBlogPosts(tag),
		metaTags: {
			title: `#${tag}`
		}
	}
}
