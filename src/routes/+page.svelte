<script context="module" lang="ts">
	import { page } from '$app/stores'
	import Date from '$lib/components/Date.svelte'
</script>

<ul>
	{#each $page.data.blogPostMetadatas as blogPostMetadata}
		<li>
			<a href="/post/{blogPostMetadata.slug}">{blogPostMetadata.title}</a>
			<Date date={blogPostMetadata.date} />
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;

		li {
			align-items: center;
			display: flex;
			justify-content: space-between;
			margin-bottom: 0.5rem;

			a {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-decoration: none;
			}
		}
	}
</style>
