import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import { Feed } from 'feed'
import fs from 'fs-extra'
import path from 'path'
import { getPublishedBlogPosts } from './src/util/serverSideBlogUtils'

const buildRssOnBuildStart = () => {
	return {
		name: 'build-rss-on-build-start',
		async buildStart() {
			const posts = await getPublishedBlogPosts()
			const feed = new Feed({
				title: 'Aaron Mamparo',
				id: 'https://aaronmamparo.com',
				link: 'https://aaronmamparo.com',
				// updated: posts[0].date,
				copyright: `© ${new Date().getFullYear()} Aaron Mamparo. All rights reserved.`,
				author: {
					name: 'Aaron Mamparo',
					email: 'aaronmamparo@gmail.com',
					link: 'https://aaronmamparo.com'
				}
			})
			posts.slice(0, 25).forEach((post) => {
				const url = `https://aaronmamparo.com/post/${post.slug}`
				feed.addItem({
					title: post.title,
					id: url,
					link: url,
					date: post.date
				})
			})
			await fs.outputFile(path.join('static', 'atom.xml'), feed.atom1())
		}
	}
}

export default defineConfig({
	plugins: [sveltekit(), buildRssOnBuildStart()],
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd())]
		}
	}
})
