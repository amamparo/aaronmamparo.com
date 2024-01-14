<script lang="ts">
	import { page } from '$app/stores'
	import BlogPosts from '$lib/components/BlogPosts.svelte'
</script>

<BlogPosts blogPosts={$page.data.blogPosts} postUrlPrefix={'/post/'} />
