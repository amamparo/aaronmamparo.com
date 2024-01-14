<script lang="ts">
	export let date: string
	const [year, month, day] = date.split('-').map(Number)
	const formatted = new Date(year, month - 1, day).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
</script>

<time datetime={date}>{formatted}</time>
