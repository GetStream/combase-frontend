import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import url from '@rollup/plugin-url'
import { visualizer } from 'rollup-plugin-visualizer';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import globals from 'rollup-plugin-node-globals';
import { prepend } from 'rollup-plugin-insert';
// import analyze from 'rollup-plugin-analyzer';

const generateHtmlTemplate = (props) => {
	const { publicPath, title } = props;
	const scripts = props.files.js.map(({ fileName }) => `<script type="text/javascript" src="${publicPath || ''}${fileName}"></script> `)
	return `
	<!DOCTYPE html>
	<html lang="en">
	  <head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#000000" />
		<meta name="description" content="Combase Widget Test" />
		<title>${title}</title>

		<style>
			html,
			body {
			width: 100%;
			height: 100%;
			overflow: hidden;
			margin: 0;
			background-color: #fcfcfc;
			}
		</style>
	  </head>
	  <body>
	  	<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root">
		  <div id="combase_widget"></div>
		</div>
		${scripts}

		<script type="text/javascript">
			CombaseWidget.init({
				el: '#combase_widget', // <-- TODO
				organization: "60b0c9215716b8022249ed7e", // <-- replace this with your Organization ID
				theme: 'light',
			});
		</script>
	  </body>
	</html>
	`
};

const config = {
    external: [''],
    input: './src/index.js',
    output: { 
		dir: 'dist',
		entryFileNames: 'combase-[hash].min.js',
		format: 'umd',
		name: 'CombaseWidget',
		sourcemap: false,
		inlineDynamicImports: true,
	},
    onwarn: (warning, onwarn) => warning.code === 'CIRCULAR_DEPENDENCY',
    plugins: [
		progress(),
		styles(),
		url({
			// by default, rollup-plugin-url will not handle font files
			include: ['**/*.woff', '**/*.woff2'],
			// setting infinite limit will ensure that the files 
			// are always bundled with the code, not copied to /dist
			limit: Infinity,
		}),
        json(),
        commonjs({
            include: /node_modules/,
        }),
        peerDepsExternal(),
        nodeResolve({
            browser: true,
			jsnext: true,
			main: true,
            extensions: ['.js'],
        }),
		babel({
			babelHelpers: 'bundled',
			extensions: ['.js'],
			configFile: '../../babel.config.js',
			exclude: /node_modules/u,
		}),
		html({
			publicPath: './',
			template: generateHtmlTemplate,
			title: 'Combase Widget',
		}),
		globals({
			buffer: false,
			dirname: false,
			filename: false,
			globals: false,
			process: true,
		}),
		prepend(
			'window.ICAL=window.ICAL||{};',
		),
		image(),
		terser(),
        filesize(),
        replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.BABEL_ENV': JSON.stringify('production'),
        }),
		visualizer({
			open: false,
			template: 'sunburst',
		}),
		// analyze(),
    ],
};

export default config;