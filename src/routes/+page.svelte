<script context="module" lang="ts">
	import { page } from '$app/stores'
</script>

<ul>
	{#each $page.data.blogPosts as blogPost}
		<li>
			<a href="/blog/{blogPost.slug}">{blogPost.title}</a>
		</li>
	{/each}
</ul>
