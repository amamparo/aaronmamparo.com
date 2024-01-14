<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import './blog-post.scss'
	import { marked } from 'marked'
	import Date from '$lib/components/Date.svelte'

	export let data: BlogPost

	import type { BlogPost } from '$lib/blog'

	const { title, tags, date, content } = data
</script>

<div class="blog-post">
	<h1 class="title">{title}</h1>
	<div class="content">
		{@html marked.parse(content, { breaks: true, gfm: true })}
	</div>
	<span class="meta">
		<Date {date} />
		{#if tags.length}
			·
			{@html tags.map((tag) => `<a href="/">${tag}</a>`).join(', ')}
		{/if}
	</span>
</div>

<style lang="scss">
	.title {
		line-height: 1;
		margin: 0 0 1rem;
		font-weight: 600;
		font-size: 1.25rem;
	}

	.meta {
		margin: 2rem 0;
	}
</style>
