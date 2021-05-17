import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
//import { terser } from 'rollup-plugin-terser';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';

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
		  <div data-organization="609bc3d8401085003fbaaae4" data-theme="light" data-fabSize="6" id="combase_widget_root"></div>
		</div>
		${scripts}
	  </body>
	</html>
	`
};

export default {
    external: [],
    input: './src/index.js',
    output: { 
		dir: 'dist',
		entryFileNames: 'combase-[hash].min.js',
		format: 'umd',
		name: 'CombaseWidget',
		sourcemap: false,
	},
    onwarn: (warning, onwarn) => warning.code === 'CIRCULAR_DEPENDENCY',
    plugins: [
		progress(),
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
        //terser(),
        filesize(),
        replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
			'process.env.BABEL_ENV': JSON.stringify('production'),
        }),
		visualizer({
			open: false,
			template: 'sunburst',
		}),
    ],
};
