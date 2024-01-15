<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte'

	export let data
	const { slug, frontMatter, content } = data
</script>

<BlogPost {slug} {frontMatter} {content} />
