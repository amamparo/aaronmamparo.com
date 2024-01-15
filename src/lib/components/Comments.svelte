<script lang="ts">
	import { onMount } from 'svelte'

	let clazz = ''
	export { clazz as class }

	onMount(() => {
		if (typeof window !== 'undefined') {
			const interval = setInterval(() => {
				if ('commento' in window) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const commento = window.commento as any
					if ('main' in commento) {
						clearInterval(interval)
						commento.main()
					}
				}
			}, 100)
		}
	})
</script>

<svelte:head>
	<script defer src="https://cdn.commento.io/js/commento.js" data-auto-init="false"></script>
</svelte:head>

<div id="commento" class={clazz}></div>
