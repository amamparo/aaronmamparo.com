<script lang="ts">
	import Comments from 'disqus-svelte'
	import type { FrontMatter } from '../../util/blogUtils'
	import Article from '$lib/components/Article.svelte'
	import Date from '$lib/components/Date.svelte'
	import { onMount } from 'svelte'

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	export let content: any
	export let frontMatter: FrontMatter
	export let slug: string
	const { title, date, tags } = frontMatter

	let showDisqus = false
	$: onMount(() => (showDisqus = true))
</script>

<Article {title}>
	<div class="pb-4 mb-4 border-gray-300 border-0 md:border-b">
		<div class="opacity-80">
			<Date {date} format="MMMM D, YYYY" />
			{#if tags.length > 0}
				·
				{#each tags as tag, index (tag)}
					<a href="/tag/{tag}">{tag}</a>{index < tags.length - 1 ? ', ' : ''}
				{/each}
			{/if}
		</div>
	</div>
	<svelte:component this={content} />
	{#if showDisqus}
		<div class="mt-10">
			<Comments identifier={slug} />
		</div>
	{/if}
</Article>
