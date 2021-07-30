import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  	plugins: [
		reactRefresh(),
	],
	resolve: {
		alias: {
			'@combase.app/ui': '@combase.app/ui/src'
		}
	},
})
