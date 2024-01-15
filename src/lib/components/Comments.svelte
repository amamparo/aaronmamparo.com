<script lang="ts">
	import { onMount } from 'svelte'

	let clazz = ''
	export { clazz as class }

	onMount(() => {
		if (typeof window !== 'undefined') {
			const interval = setInterval(() => {
				if ('commento' in window) {
					clearInterval(interval)
					;(window.commento as { main: () => void }).main()
				}
			}, 100)
		}
	})
</script>

<svelte:head>
	<script defer src="https://cdn.commento.io/js/commento.js" data-auto-init="false"></script>
</svelte:head>

<div id="commento" class={clazz}></div>
