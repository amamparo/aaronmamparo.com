<script lang="ts">
	import Section from '$lib/components/Section.svelte'

	import type { FrontMatter } from '../../util/blogUtils'

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	export let content: any
	export let frontMatter: FrontMatter
	const { title } = frontMatter
</script>

<Section {title}>
	<div class="markdown-body">
		<svelte:component this={content} />
	</div>
</Section>

<style lang="scss">
	:global(.markdown-body p) {
		text-align: justify;
	}
</style>
