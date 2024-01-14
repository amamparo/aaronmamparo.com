import * as path from 'path'
import fs from 'fs-extra'
import { getBlogPost } from './getBlogPost'
import type { BlogPost } from '../src/lib/blog'

const index = async (source: string) => {
	const sourceDir = path.join(__dirname, source)
	const staticDir = path.join(__dirname, '..', 'static')
	await fs.rmdir(path.join(staticDir, '_blog', source), { recursive: true })
	const filenames = (await fs.promises.readdir(sourceDir, { recursive: true })).filter((x) =>
		x.endsWith('.md')
	)
	const index = (
		await Promise.all(
			filenames.map(async (filename) => {
				const markdown = await fs.promises.readFile(path.join(sourceDir, filename), 'utf8')
				let blogPost
				try {
					blogPost = await getBlogPost(markdown)
				} catch (error) {
					console.error(`[${source}/${filename}]: ${(error as Error).message}`)
					return
				}
				blogPost.metadata.location = `/_blog/${source}/${blogPost.metadata.slug}.md`
				return blogPost
			})
		)
	).filter((x) => !!x) as BlogPost[]
	await Promise.all(
		index.map(async (blogPost) => {
			await fs.outputFile(
				path.join(staticDir, blogPost.metadata.location as string),
				blogPost.content
			)
		})
	)
	await fs.outputFile(
		path.join(staticDir, '_blog', source, 'index.json'),
		JSON.stringify(
			index.map((x) => x.metadata),
			null,
			4
		)
	)
}

await Promise.all(['publish', 'draft'].map(index))
