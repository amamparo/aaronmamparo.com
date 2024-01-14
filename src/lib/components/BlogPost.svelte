<script lang="ts">
	import type { FrontMatter } from '../../util/blogUtils'

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	export let content: any
	export let frontMatter: FrontMatter
	const { title } = frontMatter
</script>

<h1>{title}</h1>
<svelte:component this={content} />
