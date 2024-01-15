<script lang="ts">
	import type { BlogPostMetadata } from '../../util/blogUtils'
	import Date from '$lib/components/Date.svelte'

	export let blogPosts: BlogPostMetadata[]
	export let postUrlPrefix: string = ''
</script>

{#each blogPosts as post}
	<div class="flex justify-between w-full mb-2">
		<a
			class="whitespace-nowrap overflow-hidden overflow-ellipsis"
			href="{postUrlPrefix}{post.slug}">{post.title}</a
		>
		<small class="pl-4 whitespace-nowrap opacity-70">
			<Date date={post.date} format="MMM D, YYYY" />
		</small>
	</div>
{/each}
