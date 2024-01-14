export type BlogPostMetadata = {
	slug: string
	date: string
	title: string
	tags: string[]
	location?: string
}

export type BlogPost = {
	metadata: BlogPostMetadata
	content: string
}
