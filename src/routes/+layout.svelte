<script>
	import '../app.css'
	import HeaderLink from '$lib/components/HeaderLink.svelte'
</script>

<main>
	<header>
		<nav>
			<ul>
				<HeaderLink href="/">Writing</HeaderLink>
				<HeaderLink href="/about">About</HeaderLink>
				<HeaderLink href="/search">Search</HeaderLink>
				<HeaderLink href="/rss">Rss</HeaderLink>
			</ul>
		</nav>
	</header>
	<section>
		<slot />
	</section>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-wrap: wrap;
		max-width: 60rem;
		margin: 2rem auto;
		padding: 1rem;

		@media (max-width: 45rem) {
			display: block;
		}

		header,
		section {
			padding: 1rem;
		}

		header {
			flex-basis: 10rem;
			flex-grow: 1;
			position: relative;
			padding: 1rem;

			nav {
				display: block;

				ul {
					list-style: none;
					border-right: 1px solid #edf2f7;

					@media (max-width: 45rem) {
						border-right: 0;
						border-bottom: 1px solid #edf2f7; // TODO: DRY up
						padding-bottom: 2rem;
					}
				}
			}
		}

		section {
			flex-basis: 0;
			flex-grow: 999;
			min-width: 70%;
			display: flex;
			flex-direction: column;
		}
	}
</style>
