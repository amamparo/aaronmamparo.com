<script lang="ts">
	import dayjs from 'dayjs'
	import type { BlogPostMetadata } from '../../util/blogUtils'

	export let blogPosts: BlogPostMetadata[]
	export let postUrlPrefix: string = ''
</script>

{#each blogPosts as post}
	<div class="flex justify-between w-full mb-2">
		<a
			class="whitespace-nowrap overflow-hidden overflow-ellipsis"
			href="{postUrlPrefix}{post.slug}">{post.title}</a
		>
		<time class="pl-4 whitespace-nowrap">{dayjs(post.date).format('YYYY-MM-DD')}</time>
	</div>
{/each}
