module.exports = {
    plugins: [
		'babel-plugin-styled-components', 
		['@babel/plugin-transform-runtime',{ useESModules: true, version: '^7.4.4' }],
		["module-resolver", {
			"root": ["./"],
			"alias": {
				"@conf": "./config",
			}
		}]
	],
    presets: ['@babel/preset-env', '@babel/preset-react'],
};
