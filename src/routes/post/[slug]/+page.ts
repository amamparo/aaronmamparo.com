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
	const frontMatter = parseFrontMatter(post.metadata) as FrontMatter
	return {
		slug,
		frontMatter,
		content: post.default,
		images: [
			{
				url: frontMatter.imageUrl,
				width: 512,
				height: 512,
				alt: frontMatter.title
			}
		],
		metaTags: {
			title: frontMatter.title,
			keywords: frontMatter.tags
		}
	}
}
