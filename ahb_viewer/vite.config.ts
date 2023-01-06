import { sveltekit } from '@sveltejs/kit/vite';
import json from '@rollup/plugin-json'
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(),
		json({
		compact: true
	})],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	
};  

export default config;
