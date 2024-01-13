<script lang="ts">
	import { marked } from 'marked'
	import Date from '$lib/components/Date.svelte'

	export let data
	const { body, title, tags, date } = data
</script>

<h1 class="title">{title}</h1>

<div class="markdown-container">
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

	:global {
		.markdown-container {
			a {
				color: #000;
				text-decoration-skip-ink: auto;
				text-decoration: underline;
			}

			pre {
				margin: 0.5rem 0;
				padding: 0.5rem;
			}

			p {
				margin: 0.5rem 0;
			}

			code,
			pre {
				background: #ecedee;
			}

			code {
				padding: 0.1rem;
			}

			pre code {
				border: none;
			}

			pre {
				padding: 1rem;
				overflow-x: auto;
			}

			img {
				max-width: 100%;
			}

			hr {
				background: #000;
				height: 1px;
				border: 0;
			}

			blockquote {
				font-style: italic;
				border-left: 5px solid #ececec;
				padding-left: 1rem;
			}

			h1,
			h2,
			h3,
			h4,
			h5 {
				line-height: 1;
				margin: 1.25rem 0 1rem;
				font-weight: 600;
			}

			strong,
			b {
				font-weight: bold;
			}
		}
	}
</style>
