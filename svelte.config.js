import adapter from 'svelte-adapter-bun'
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
