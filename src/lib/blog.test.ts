import { describe, test, expect, beforeAll } from 'bun:test'
import { type BlogPost, parseBlogPost } from './blog'

describe('parseBlogPost', () => {
	describe('successfully', () => {
		describe('all metadata', () => {
			let blogPost: BlogPost

			beforeAll(async () => {
				blogPost = await parseBlogPost(`
				
					---
					title: Hello, World!
					date: 2024-01-01
					tags: foo, bar
					---
					
					Lorem ipsum dolor sim amet
					
				`)
			})

			test('title', () => {
				expect(blogPost.title).toBe('Hello, World!')
			})

			test('date', () => {
				expect(blogPost.date).toEqual(new Date('2024-01-01'))
			})

			test('slug', () => {
				expect(blogPost.slug).toBe('2024-01-01-hello-world')
			})

			test('tags', () => {
				expect(blogPost.tags).toEqual(['foo', 'bar'])
			})

			test('content', () => {
				expect(blogPost.content).toBe('Lorem ipsum dolor sim amet')
			})
		})

		test('missing tags', async () => {
			const blogPost = await parseBlogPost(`
				---
				title: Hello, World!
				date: 2024-01-01
				---
				Lorem ipsum dolor sim amet
			`)
			expect(blogPost.tags).toBeEmpty()
		})

		test('with dividers in content', async () => {
			const blogPost = await parseBlogPost(`
				---
				title: Hello, World!
				date: 2024-01-01
				---
				Lorem ipsum dolor sim amet
				
				---
				
				Foo bar
			`)
			expect(blogPost.content).toBe(
				`
				Lorem ipsum dolor sim amet
				
				---
				
				Foo bar
			`.trim()
			)
		})
	})

	describe('unsuccessfully', async () => {
		test('missing front matter', async () => {
			expect(await getErrorMessage(parseBlogPost(`Lorem ipsum dolor sim amet`))).toBe(
				'Missing front matter'
			)
		})

		test('missing title', async () => {
			expect(
				await getErrorMessage(
					parseBlogPost(`
					---
					title:
					date: 2024-01-01
					---
					Lorem ipsum dolor sim amet
				`)
				)
			).toBe('Missing title')
		})

		test('missing date', async () => {
			expect(
				await getErrorMessage(
					parseBlogPost(`
					---
					title: Hello, World!
					---
					Lorem ipsum dolor sim amet
				`)
				)
			).toBe('Missing date')
		})

		test('invalid date', async () => {
			expect(
				await getErrorMessage(
					parseBlogPost(`
					---
					title: Hello, World!
					date: 24-01-01
					---
					Lorem ipsum dolor sim amet
				`)
				)
			).toBe('Invalid date')
		})

		test('missing content', async () => {
			expect(
				await getErrorMessage(
					parseBlogPost(`
					---
					title: Hello, World!
					date: 2024-01-01
					---
					
				`)
				)
			).toBe('Missing content')
		})
	})
})

const getErrorMessage = async (promise: Promise<BlogPost>): Promise<string | undefined> => {
	try {
		await promise
	} catch (error) {
		return (error as Error).message as string
	}
}
