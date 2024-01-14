<script lang="ts">
	import { page } from '$app/stores'
	import dayjs from 'dayjs'
	import Section from '$lib/components/Section.svelte'
</script>

<Section>
	<ul>
		{#each $page.data.blogPosts as post}
			<li>
				<a href="/post/{post.slug}">{post.title}</a>
				<time>{dayjs(post.date).format('YYYY-MM-DD')}</time>
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
