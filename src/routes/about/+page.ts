export async function load() {
	// @ts-expect-error shut up ts
	const post = await import('../../../config/about.md')
	return {
		content: post.default
	}
}
