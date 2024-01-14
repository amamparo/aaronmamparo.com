import type { BlogPost } from '../src/lib/blog'

export const getBlogPost = async (markdown: string): Promise<BlogPost> => {
	const frontMatterMatch = markdown.trim().match(/^---\s*[\s\S]+?---/)
	if (!frontMatterMatch) {
		throw new Error('Missing front matter')
	}
	const frontMatter = frontMatterMatch[0]
		.replace(/---/g, '')
		.split('\n')
		.filter((x) => x.includes(':'))
		.map((x) => x.split(':', 2))
		.reduce(
			(metadata, [key, value]) => ({
				...metadata,
				[key.trim()]: value.trim()
			}),
			{}
		) as { [key: string]: string }

	const title = frontMatter.title
	if (!title) {
		throw new Error('Missing title')
	}

	const date = frontMatter.date
	if (!date) {
		throw new Error('Missing date')
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		throw new Error('Invalid date')
	}

	const metadata = {
		slug: `${date}-${title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')}`,
		date,
		title,
		tags: frontMatter.tags ? frontMatter.tags.split(',').map((x) => x.trim()) : []
	}
	return {
		metadata,
		content: markdown.split('---').pop()!.trim()
	}
}
