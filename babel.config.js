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
    presets: ['@babel/preset-env', '@babel/preset-react'],
	"env": {
		"production": {
		  "plugins": ["transform-react-remove-prop-types"]
		}
	  }
};
