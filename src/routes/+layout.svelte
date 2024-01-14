<script>
	import '../app.css'
</script>

<main class="display-flex px-8 my-12 mx-auto">
	<header class="p-4">
		<nav class="pb-8 border-b border-gray-200">
			<a class="mr-4" href="/">Thoughts</a>
			<a class="mr-4" href="/about">About</a>
			<a class="mr-4" href="/atom.xml">RSS</a>
		</nav>
	</header>
	<section class="p-4">
		<slot />
	</section>
</main>
