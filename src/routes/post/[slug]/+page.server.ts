export async function load({ params, parent }) {
	const { slug } = params
	const { blogPosts } = await parent()
	return blogPosts.find((x) => x.slug === slug)
}
