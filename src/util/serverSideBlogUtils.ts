import fs from 'fs-extra'
import { compile } from 'mdsvex'
import { type BlogPostMetadata, parseFrontMatter } from './blogUtils'

export async function getPublishedBlogPosts(): Promise<BlogPostMetadata[]> {
	return getBlogPosts('blog')
}

export async function getDraftBlogPosts(): Promise<BlogPostMetadata[]> {
	return getBlogPosts('blog/drafts')
}

export async function getBlogPosts(markdownDir: string): Promise<BlogPostMetadata[]> {
	const filenames = await Promise.all(
		(await fs.promises.readdir(markdownDir, 'utf-8')).filter((filename) =>
			filename.endsWith('.md')
		)
	)
	return (
		await Promise.all(
			filenames.map(async (filename) => {
				const compiled = await fs.promises
					.readFile(`${markdownDir}/${filename}`, 'utf-8')
					.then((md) => compile(md))
				if (!compiled) {
					console.warn('Could not compile markdown')
					return
				}
				if (!compiled.data || !compiled.data.fm) {
					console.warn('Front matter is missing')
					return
				}
				const frontMatter = parseFrontMatter(compiled.data.fm as Record<string, unknown>)
				if (!frontMatter) {
					return
				}
				const requiredKeys = ['title', 'date']
				const missingKeys = requiredKeys.filter((key) => !(key in frontMatter))
				if (missingKeys.length) {
					console.warn(`Missing required keys in front matter: ${missingKeys.join(', ')}`)
					return
				}
				return {
					...frontMatter,
					slug: filename.replace(/\.md$/, '')
				}
			})
		)
	)
		.filter((x) => !!x)
		.map((x) => x as BlogPostMetadata)
		.sort((a, b) => (a.date > b.date ? -1 : 1))
}
