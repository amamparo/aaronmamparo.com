<script lang="ts">
	import { page } from '$app/stores'

	export let href: string
</script>

<a
	{href}
	class="mr-4 md:text-right md:mr-8 md:mb-2"
	class:font-semibold={$page.url.pathname === `${href}/`.replace('//', '/')}><slot /></a
>
