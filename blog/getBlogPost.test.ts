import { describe, test, expect, beforeAll } from 'bun:test'
import type { BlogPost } from '../src/lib/blog'
import { getBlogPost } from './getBlogPost'

describe('getBlogPost', () => {
	describe('successfully', () => {
		describe('all metadata', () => {
			let blogPost: BlogPost

			beforeAll(async () => {
				blogPost = await getBlogPost(`
				
					---
					title: Hello, World!
					date: 2024-01-01
					tags: foo, bar
					---
					
					Lorem ipsum dolor sim amet
					
				`)
			})

			test('title', () => {
				expect(blogPost.metadata.title).toBe('Hello, World!')
			})

			test('date', () => {
				expect(blogPost.metadata.date).toBe('2024-01-01')
			})

			test('slug', () => {
				expect(blogPost.metadata.slug).toBe('2024-01-01-hello-world')
			})

			test('tags', () => {
				expect(blogPost.metadata.tags).toEqual(['foo', 'bar'])
			})

			test('content', () => {
				expect(blogPost.content).toBe('Lorem ipsum dolor sim amet')
			})
		})

		test('missing tags', async () => {
			const blogPost = await getBlogPost(`
				---
				title: Hello, World!
				date: 2024-01-01
				---
				Lorem ipsum dolor sim amet
			`)
			expect(blogPost.metadata.tags).toBeEmpty()
		})
	})

	describe('unsuccessfully', async () => {
		test('missing front matter', async () => {
			expect(await getErrorMessage(getBlogPost(`Lorem ipsum dolor sim amet`))).toBe(
				'Missing front matter'
			)
		})

		test('missing title', async () => {
			expect(
				await getErrorMessage(
					getBlogPost(`
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
					getBlogPost(`
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
					getBlogPost(`
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
					getBlogPost(`
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
