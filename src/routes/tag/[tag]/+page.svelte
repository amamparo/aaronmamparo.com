<script lang="ts">
	import { page } from '$app/stores'
	import BlogPosts from '$lib/components/BlogPosts.svelte'

	export let data
	const { tag } = data
</script>

<div class="italic opacity-70 pb-3 mb-3 border-gray-300 border-0 md:border-b">
	Post tagged with <span class="font-semibold">#{tag}</span>
</div>

<BlogPosts blogPosts={$page.data.blogPosts} />
