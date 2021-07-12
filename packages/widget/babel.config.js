module.exports = {
    plugins: [
		'babel-plugin-styled-components', 
		["module-resolver", {
			"root": ["./"],
			"alias": {
				"@conf": "./config",
			}
		}]
	],
    presets: [
		[
			'@babel/preset-env',
			{
				bugfixes: true,
				browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
				modules: false,
			},
		], 
		'@babel/preset-react'
	],
	"env": {
		"production": {
		  "plugins": ["transform-react-remove-prop-types"]
		},
	  }
};
