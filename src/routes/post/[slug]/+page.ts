import { type FrontMatter, parseFrontMatter } from '../../../util/blogUtils'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const { slug } = params
	let post
	try {
		post = await import(`../../../../blog/${slug}.md`)
	} catch (e) {
		error(404)
	}
	return {
		slug,
		frontMatter: parseFrontMatter(post.metadata) as FrontMatter,
		content: post.default
	}
}
