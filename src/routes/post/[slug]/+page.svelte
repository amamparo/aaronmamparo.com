<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import './post-body.scss'
	import { marked } from 'marked'
	import Date from '$lib/components/Date.svelte'

	export let data
	const { body, title, tags, date } = data
</script>

<h1 class="title">{title}</h1>

<div class="post-body">
	{@html marked.parse(body, { breaks: true, gfm: true })}
</div>

<span class="meta">
	<Date {date} />
	{#if tags.length}
		·
		{@html tags.map((tag) => `<a href="/tag/${tag}">${tag}</a>`).join(', ')}
	{/if}
</span>

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
