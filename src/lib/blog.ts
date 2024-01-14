import fs from 'fs-extra'
import { compile } from 'mdsvex'

export type BlogPost = {
	slug: string
	date: Date
	title: string
	tags: string[]
}

export async function getBlogPosts(): Promise<BlogPost[]> {
	const filenames = await Promise.all(
		(await fs.promises.readdir('blog', 'utf-8')).filter((filename) => filename.endsWith('.md'))
	)
	return (
		await Promise.all(
			filenames.map(async (filename) => {
				const compiled = await fs.promises
					.readFile(`blog/${filename}`, 'utf-8')
					.then((md) => compile(md))
				if (!compiled) {
					console.warn('Could not compile markdown')
					return
				}
				if (!compiled.data || !compiled.data.fm) {
					console.warn('Front matter is missing')
					return
				}
				const frontMatter = compiled.data.fm as Record<string, unknown>
				const requiredKeys = ['title', 'date']
				const missingKeys = requiredKeys.filter((key) => !(key in frontMatter))
				if (missingKeys.length) {
					console.warn(`Missing required keys in front matter: ${missingKeys.join(', ')}`)
					return
				}
				const title = frontMatter.title as string
				const date = frontMatter.date as Date
				const tags = frontMatter.tags as string | undefined
				return {
					title,
					date,
					slug: filename.replace(/\.md$/, ''),
					tags: (tags ?? '').split(',').map((tag: string) => tag.trim())
				}
			})
		)
	)
		.filter((x) => !!x)
		.map((x) => x as BlogPost)
		.sort((a, b) => (a.date > b.date ? -1 : 1))
}
