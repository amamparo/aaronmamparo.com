<script>
	import '../app.css'
</script>

<div class="leading-6 px-4 my-12 mx-auto flex flex-col md:flex-row justify-center md:max-w-3xl">
	<div class="p-4">
		<nav
			class="pb-8 border-b border-gray-200 flex flex-row md:border-b-0 md:border-r md:flex-col md:pb-0"
		>
			<a class="mr-4 md:text-right md:mr-8 md:mb-1" href="/">Thoughts</a>
			<a class="mr-4 md:text-right md:mr-8 md:mb-1" href="/about">About</a>
			<a class="mr-4 md:text-right md:mr-8 md:mb-1" href="/atom.xml">RSS</a>
		</nav>
	</div>
	<div class="p-4 flex-grow">
		<slot />
	</div>
</div>
