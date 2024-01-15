<script lang="ts">
	import type { FrontMatter } from '../../util/blogUtils'
	import Article from '$lib/components/Article.svelte'

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	export let content: any
	export let frontMatter: FrontMatter
	const { title } = frontMatter
</script>

<Article {title}>
	<svelte:component this={content} />
</Article>
