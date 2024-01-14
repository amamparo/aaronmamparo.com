import { type FrontMatter, parseFrontMatter } from '../../../util/blogUtils'

export async function load({ params }) {
	const { slug } = params
	const post = await import(`../../../../blog/drafts/${slug}.md`)
	return {
		frontMatter: parseFrontMatter(post.metadata) as FrontMatter,
		content: post.default
	}
}
