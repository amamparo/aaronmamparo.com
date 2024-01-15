<script lang="ts">
	import dayjs from 'dayjs'
	const doFormat = (date: Date, fmt: string): string => {
		return dayjs(date).add(date.getTimezoneOffset(), 'minute').format(fmt)
	}

	export let date: Date
	export let format: string
</script>

<time datetime={date.toISOString()}>{doFormat(date, format)}</time>
