import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  	plugins: [
		reactRefresh(),
		legacy({
			targets: ['ie >= 11'],
			additionalLegacyPolyfills: ['regenerator-runtime/runtime']
		})
	],
	resolve: {
		alias: {
			'@combase.app/ui': '@combase.app/ui/src',
			apollo: path.resolve('./src/apollo'),
			components: path.resolve('./src/components'),
			contexts: path.resolve('./src/contexts'),
			hooks: path.resolve('./src/hooks'),
			screens: path.resolve('./src/screens'),
			styles: path.resolve('./src/styles'),
			utils: path.resolve('./src/utils'),
		}
	},
})
