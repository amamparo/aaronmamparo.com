export type BlogPostMetadata = FrontMatter & {
	slug: string
}

export type FrontMatter = {
	date: Date
	title: string
	tags: string[]
}

export function parseFrontMatter(frontMatter: Record<string, unknown>): FrontMatter | undefined {
	const requiredKeys = ['title', 'date']
	const missingKeys = requiredKeys.filter((key) => !(key in frontMatter))
	if (missingKeys.length) {
		console.warn(`Missing required keys in front matter: ${missingKeys.join(', ')}`)
		return
	}
	return {
		title: frontMatter.title as string,
		date: new Date(frontMatter.date as string),
		tags: ((frontMatter.tags as string | undefined) ?? '')
			.split(',')
			.map((tag: string) => tag.trim())
			.filter((tag) => tag.length > 0)
	}
}
