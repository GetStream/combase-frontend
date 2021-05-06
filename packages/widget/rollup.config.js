import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
    external: [/@babel\/runtime/u],
    input: './src/index.js',
    output: [
        {
            dir: `./lib/cjs`,
            format: 'cjs',
        },
        {
            dir: `./lib/esm`,
            format: 'esm',
        },
    ],
	onwarn: (warning, onwarn) => warning.code === 'CIRCULAR_DEPENDENCY',
    plugins: [
        json(),
        commonjs({
            include: '../../node_modules/**',
        }),
        peerDepsExternal(),
        nodeResolve({
            extensions: ['.js'],
        }),
        babel({
            babelHelpers: 'runtime',
            extensions: ['.js'],
            configFile: '../../babel.config.js',
            exclude: '../../node_modules/**',
        }),
		visualizer(),
    ],
};
