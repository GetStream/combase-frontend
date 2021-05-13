import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
//import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';

export default {
    external: [/@babel\/runtime/u],
    input: './src/index.js',
    output: [
        {
            file: `./dist/umd/combase.production.min.js`,
            format: 'umd',
            name: 'CombaseWidget',
            sourcemap: false,
        },
    ],
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
            extensions: ['.js'],
        }),
        babel({
            babelHelpers: 'runtime',
            extensions: ['.js'],
            configFile: '../../babel.config.js',
            exclude: /node_modules/,
        }),
        //terser(),
        visualizer(),
        filesize(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
};
