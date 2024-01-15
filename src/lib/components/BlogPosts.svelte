<script lang="ts">
	import type { BlogPostMetadata } from '../../util/blogUtils'

	export let blogPosts: BlogPostMetadata[]
	export let postUrlPrefix: string = ''

	const format = (date: Date): string => {
		const year = date.getFullYear().toString().padStart(4, '0')
		const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
		const day = date.getUTCDate().toString().padStart(2, '0')
		return `${year}-${month}-${day}`
	}
</script>

{#each blogPosts as post}
	<div class="flex justify-between w-full mb-2">
		<a
			class="whitespace-nowrap overflow-hidden overflow-ellipsis"
			href="{postUrlPrefix}{post.slug}">{post.title}</a
		>
		<time class="pl-4 whitespace-nowrap">{format(post.date)}</time>
	</div>
{/each}
