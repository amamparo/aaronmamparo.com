<script lang="ts">
	import dayjs from 'dayjs'
	import type { BlogPostMetadata } from '../../util/blogUtils'

	export let blogPosts: BlogPostMetadata[]
	export let postUrlPrefix: string = ''
</script>

<ul>
	{#each blogPosts as post}
		<li>
			<a href="{postUrlPrefix}{post.slug}">{post.title}</a>
			<time>{dayjs(post.date).format('YYYY-MM-DD')}</time>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		list-style: none;
		margin: 0;
		padding: 0;

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
