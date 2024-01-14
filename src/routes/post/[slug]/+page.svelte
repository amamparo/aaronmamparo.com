<script lang="ts">
	import BlogPost from '$lib/components/BlogPost/BlogPost.svelte'

	export let data: BlogPost
</script>

<BlogPost blogPost={data} />
