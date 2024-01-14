<script lang="ts">
	export let date: Date
</script>

<time datetime={date.toISOString()}>
	{date.toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	})}
</time>
