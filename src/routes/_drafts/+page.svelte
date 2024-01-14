<script lang="ts">
	import { page } from '$app/stores'
	import Section from '$lib/components/Section.svelte'
	import BlogPosts from '$lib/components/BlogPosts.svelte'
</script>

<Section>
	<BlogPosts blogPosts={$page.data.blogPosts} />
</Section>
