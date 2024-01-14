<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import { marked } from 'marked'
	import Date from '$lib/components/Date.svelte'

	export let data: BlogPost

	import type { BlogPost } from '$lib/blog'
	import Section from '$lib/components/Section.svelte'

	const { title, tags, date, content } = data
</script>

<Section {title}>
	<div class="blog-post-content">
		{@html marked.parse(content, { breaks: true, gfm: true })}
	</div>
	<span class="meta">
		<Date {date} />
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
