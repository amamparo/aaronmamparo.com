import fs from 'fs-extra'
import path from 'path'

export type BlogPost = {
	slug: string
	date: Date
	title: string
	tags: string[]
	content: string
}

export const parseBlogPost = async (markdown: string): Promise<BlogPost> => {
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
	const [year, month, day] = date.split('-').map(Number)

	return {
		slug: `${date}-${title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')}`,
		date: new Date(year, month - 1, day),
		title,
		tags: frontMatter.tags ? frontMatter.tags.split(',').map((x) => x.trim()) : [],
		content
	}
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
	const filenames = (await fs.promises.readdir('blog')).filter((x) => x.endsWith('.md'))
	return (
		await Promise.all(
			filenames.map(async (filename) => {
				const markdown = await fs.promises.readFile(path.join('blog', filename), 'utf8')
				try {
					return await parseBlogPost(markdown)
				} catch (error) {
					console.error(`[${filename}]: ${(error as Error).message}`)
					return
				}
			})
		)
	)
		.filter((x) => !!x)
		.sort((a, b) => (a!.date > b!.date ? -1 : 1)) as BlogPost[]
}
