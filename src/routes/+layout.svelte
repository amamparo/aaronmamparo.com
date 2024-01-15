<script>
	import '../app.css'
	import Link from './Link.svelte'
</script>

<div class="leading-6 px-4 my-12 mx-auto flex flex-col md:flex-row justify-center">
	<div class="p-4 md:w-36">
		<nav
			class="pb-8 border-b border-gray-200 flex flex-row md:border-b-0 md:border-r md:flex-col md:pb-0"
		>
			<Link href="/">Thoughts</Link>
			<Link href="/about">About</Link>
			<Link href="/atom.xml">RSS</Link>
		</nav>
	</div>
	<div class="p-4 flex-grow md:max-w-3xl">
		<slot />
	</div>
</div>
