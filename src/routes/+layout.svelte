<script>
	import '../app.css'
	import Link from './Link.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import { page } from '$app/stores'
	import { afterUpdate, onMount } from 'svelte'

	$: metaTags = {
		title: 'Aaron Mamparo',
		openGraph: {
			siteName: 'Aaron Mamparo',
			url: $page.url,
			images: $page.data.images ?? [
				{
					url: '/headshot-512.png',
					width: 512,
					height: 512,
					alt: 'Aaron Mamparo 512x512'
				}
			]
		},
		...$page.data.metaTags
	}

	const openExternalLinksInNewTab = () => document.querySelectorAll('a').forEach(link => {
		if (new URL(link.href).hostname !== window.location.hostname) {
			link.target = '_blank'
			link.rel = 'noopener noreferrer'
		}
	})

	onMount(openExternalLinksInNewTab)
	afterUpdate(openExternalLinksInNewTab)
</script>

<MetaTags {...metaTags} />

<div class="leading-6 px-4 my-12 mx-auto flex flex-col justify-center md:flex-row md:max-w-4xl">
	<div class="p-4 md:min-w-36">
		<nav
			class="pb-8 border-b border-gray-300 flex flex-row md:border-b-0 md:border-r md:flex-col md:pb-0"
		>
			<Link href="/">Thoughts</Link>
			<Link href="/about">About</Link>
			<Link href="/atom.xml">RSS</Link>
		</nav>
	</div>
	<div class="p-4 flex-grow">
		<slot />
	</div>
</div>
