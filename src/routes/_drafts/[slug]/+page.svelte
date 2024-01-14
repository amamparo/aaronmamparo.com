<script lang="ts">
	import BlogPost from '$lib/components/BlogPost.svelte'

	export let data
	const { frontMatter, content } = data
</script>

<BlogPost {frontMatter} {content} />
