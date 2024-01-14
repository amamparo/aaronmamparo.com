<script lang="ts">
	import BlogPost from '$lib/components/BlogPost/BlogPost.svelte'
	import type { BlogPostMetadata } from '$lib/blog'

	export let data: {
		metadata: BlogPostMetadata
		content: string
	}
</script>

<BlogPost blogPost={data} />
