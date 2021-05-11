module.exports = {
    plugins: [
		[
			'babel-plugin-import',
			{
			  'libraryName': '@combase.app/ui',
			  // Use "'libraryDirectory': ''," if your bundler does not support ES modules
			  'libraryDirectory': 'esm',
			  'camel2DashComponentName': false
			},
			'ui'
		],
		'babel-plugin-styled-components', 
		[
			'@babel/plugin-transform-runtime',
			{ useESModules: true, version: '^7.4.4' },
		],
		["module-resolver", {
			"root": ["./"],
			"alias": {
				"@conf": "./config"
			}
		}]
	],
    presets: ['@babel/preset-env', '@babel/preset-react'],
};
