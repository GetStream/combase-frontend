module.exports = {
    plugins: [
		'babel-plugin-styled-components', 
		'@babel/transform-runtime',
		["module-resolver", {
			"root": ["./"],
			"alias": {
				"@conf": "./config"
			}
		}]
	],
    presets: ['@babel/preset-env', '@babel/preset-react'],
};
