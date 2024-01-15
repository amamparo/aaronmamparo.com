<script>
	import Article from '$lib/components/Article.svelte'

	export let data
</script>

<Article>
	<svelte:component this={data.content} />
</Article>
