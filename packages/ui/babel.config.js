module.exports = (api) => {
	api.cache(true);

	const presets = [
	  [
		'@babel/preset-env',
		{
		  bugfixes: true,
		  browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
		  modules: false,
		},
	  ],
	  [
		'@babel/preset-react',
		{
		  runtime: 'automatic',
		},
	  ]
	];
  
	const plugins = [
	  ['@babel/plugin-transform-runtime',{ useESModules: true, version: '^7.4.4' }],
	];
  
	return {
		presets,
		plugins,
		ignore: [/@babel\/runtime/, "**/*.spec.js", "**/*.stories.js"],
	};
  };
  