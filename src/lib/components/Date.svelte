<script lang="ts">
	export let date: string
	const formatted = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
</script>

<time datetime={date}>{formatted}</time>
