<script context="module" lang="ts">
	import { page } from '$app/stores'
	import Date from '$lib/components/Date.svelte'
	import Section from '$lib/components/Section.svelte'
</script>

<Section>
	<ul>
		{#each $page.data.blogPosts as blogPost}
			<li>
				<a href="/post/{blogPost.slug}">{blogPost.title}</a>
				<Date date={blogPost.date} />
			</li>
		{/each}
	</ul>
</Section>

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
