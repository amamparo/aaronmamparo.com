<script lang="ts">
	import dayjs from 'dayjs'
	import type { BlogPostMetadata } from '../../util/blogUtils'

	export let blogPosts: BlogPostMetadata[]
	export let postUrlPrefix: string = ''
</script>

{#each blogPosts as post}
	<div>
		<a href="{postUrlPrefix}{post.slug}">{post.title}</a>
		<time>{dayjs(post.date).format('YYYY-MM-DD')}</time>
	</div>
{/each}
