<script>
	import '../app.css'
	import Link from './Link.svelte'
</script>

<div class="leading-6 px-4 my-12 mx-auto flex flex-col justify-center md:flex-row md:max-w-4xl">
	<div class="p-4 md:min-w-36">
		<nav
			class="pb-8 border-b border-gray-200 flex flex-row md:border-b-0 md:border-r md:flex-col md:pb-0"
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
