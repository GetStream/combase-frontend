import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
    external: ['@combase.app/ui', /@babel\/runtime/u],
    input: './src/WidgetChannelPreview.js',
    output: [
        {
            dir: `./dist/cjs`,
            format: 'cjs',
        },
        {
            dir: `./dist/esm`,
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
