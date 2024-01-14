<script context="module" lang="ts">
	import './section.scss'
</script>

<script lang="ts">
	export let title: string = ''
</script>

<div class="section">
	{#if title}
		<h1 class="title">{title}</h1>
	{/if}
	<slot />
</div>

<style lang="scss">
	.title {
		line-height: 1;
		margin: 0.5rem 0 1rem;
		font-weight: 600;
		font-size: 1.25rem;
	}
</style>
