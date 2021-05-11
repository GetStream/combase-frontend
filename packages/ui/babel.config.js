module.exports = (api) => {
	api.cache(true);

	const presets = [
	  [
		'@babel/preset-env',
		{
		  bugfixes: true,
		  browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
		  modules: false
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
	  ['@babel/plugin-proposal-class-properties', { loose: true }],
	  ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
	  [
		'@babel/plugin-proposal-private-methods', { "loose": true }
	  ],
	  [
		'@babel/plugin-transform-runtime',
		{ useESModules: true, version: '^7.4.4' },
	  ],
	  '@babel/plugin-transform-react-constant-elements',
	  [
		  'babel-plugin-transform-react-remove-prop-types',
		{
			mode: 'unsafe-wrap',
		},
	  ],
	];
  
	return {
		presets,
		plugins,
		ignore: [/@babel\/runtime/, "**/*.spec.js", "**/*.stories.js"],
	};
  };
  