import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess({
			scss: true
		}),
		mdsvex({
			extensions: ['.md']
		})
	],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter()
	}
}

export default config
