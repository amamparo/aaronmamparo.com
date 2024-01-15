<script lang="ts">
	import Article from '$lib/components/Article.svelte'
	import Date from '$lib/components/Date.svelte'
	import Comments from '$lib/components/Comments.svelte'

	export let data
	const { frontMatter, content } = data
	const { title, date, tags } = frontMatter
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
</Article>
<Comments class="mt-12" />
