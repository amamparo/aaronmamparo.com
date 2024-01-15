<script lang="ts">
	export let title: string = ''
</script>

<article class="prose max-w-none">
	{#if title}
		<h2 class="mb-2 text-3xl">{title}</h2>
	{/if}
	<slot />
</article>

<style lang="scss">
	:global(article.prose p) {
		text-align: justify;
	}
</style>
