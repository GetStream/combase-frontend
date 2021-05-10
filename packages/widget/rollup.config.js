import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const input = './src/index.js';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const babelOptions = {
  exclude: /node_modules/,
  // We are using @babel/plugin-transform-runtime
  babelHelpers: 'runtime',
  configFile: '../../babel.config.js',
};

const commonjsOptions = {
  preferBuiltins: true,
  ignoreGlobal: true,
  include: /node_modules/,
};

function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') return;
  if (
	warning.code === 'CIRCULAR_DEPENDENCY' || 
    warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
    warning.source === 'react' &&
    warning.names.filter((identifier) => identifier !== 'useDebugValue').length === 0
  ) {
    // only warn for
    // import * as React from 'react'
    // if (__DEV__) React.useDebugValue()
    // React.useDebug not fully dce'd from prod bundle
    // in the sense that it's still imported but unused. Downgrading
    // it to a warning as a reminder to fix at some point
    console.warn(warning.message);
  } else {
    throw Error(warning.message);
  }
}

export default {
	input,
	onwarn,
	output: {
		file: 'dist/umd/combase-widget.production.min.js',
		format: 'umd',
		name: 'CombaseWidget',
		globals,
	},
	external: Object.keys(globals),
	plugins: [
		nodeResolve(),
		babel(babelOptions),
		commonjs(commonjsOptions),
		nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
		replace({ preventAssignment: false, 'process.env.NODE_ENV': JSON.stringify('production') }),
		sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
		terser(),
	],
};