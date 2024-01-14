// import { type FrontMatter, parseFrontMatter } from '$lib/blog'

export async function load({ params }) {
	const { slug } = params
	const post = await import(`../../../../blog/${slug}.md`)
	const { title, date, tags } = post.metadata
	return {
		title,
		date,
		tags: ((tags ?? '') as string).split(',').map((tag) => tag.trim()),
		content: post.default
	}
}
