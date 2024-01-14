<script lang="ts">
	export let title: string = ''
</script>

<div class="section">
	{#if title}
		<h2 class="title">{title}</h2>
	{/if}
	<slot />
</div>

<style lang="scss">
	.title {
		line-height: 1;
		margin: 0.25rem 0 1.5rem;
		font-weight: 600;
	}

	:global(.section p) {
		margin: 1rem 0;
	}
</style>
