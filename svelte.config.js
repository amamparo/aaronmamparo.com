import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			scss: true
		})
	],
	kit: {
		adapter: adapter()
	}
}

export default config
