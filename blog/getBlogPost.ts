import type { BlogPost } from '../src/lib/blog'

export const getBlogPost = async (markdown: string): Promise<BlogPost> => {
	const sections = markdown.trim().split('---')
	if (sections.length < 3 || sections[0] !== '') {
		throw new Error('Missing front matter')
	}
	const frontMatterSection = sections[1]
	const content = sections.slice(2).join('---').trim()
	if (!content) {
		throw new Error('Missing content')
	}

	const frontMatter = frontMatterSection
		.trim()
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
		content
	}
}
