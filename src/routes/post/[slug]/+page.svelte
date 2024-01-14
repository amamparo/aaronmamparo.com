<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import Section from '$lib/components/Section.svelte'

	import dayjs from 'dayjs'

	export let data
	const { title, date, tags, content } = data
</script>

<Section {title}>
	<svelte:component this={content} />
	<span class="meta">
		<time>{dayjs(date).format('YYYY-MM-DD')}</time>
		{#if tags.length}
			·
			{@html tags.map((tag) => `<a href="/">${tag}</a>`).join(', ')}
		{/if}
	</span>
</Section>

<style lang="scss">
	.meta {
		margin: 2rem 0;
	}
</style>
