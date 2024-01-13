<script lang="ts">
	import { page } from '$app/stores'

	export let href: string
</script>

<li><a {href} class:active={$page.url.pathname === href}><slot /></a></li>

<style lang="scss">
	li {
		margin-bottom: 0.2rem;
		text-align: right;
		margin-right: 2rem;

		a {
			text-decoration: none;

			&.active {
				font-weight: bold;
			}
		}

		@media (max-width: 45rem) {
			display: inline;
			margin-right: 1rem;
		}
	}
</style>
