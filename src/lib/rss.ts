import fs from 'fs-extra'
import path from 'path'
import { getBlogPosts } from './blog'
import { Feed } from 'feed'
import { marked } from 'marked'

const posts = await getBlogPosts()

const feed = new Feed({
	title: 'Aaron Mamparo',
	id: 'https://aaronmamparo.com',
	link: 'https://aaronmamparo.com',
	updated: posts[0].date,
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
		date: post.date,
		content: marked.parse(post.content) as string
	})
})

await fs.outputFile(path.join('static', 'atom.xml'), feed.atom1())
