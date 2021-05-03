import configure from '../../config/rollup.config';

export default configure({
    input: './src/index.js',
	external: ['@combase.app/ui', '@combase.app/styles']
});
