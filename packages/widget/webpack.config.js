const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.js'),
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: ['file-loader']
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader',
				],
			},
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/styles$/,
			contextRegExp: /react-file-utils$/,
		}),
	],
	output: {
		library: 'CombaseWidget',
    	libraryTarget: 'umd',
		filename: 'combase-widget.js',
		path: path.resolve(__dirname, 'dist'),
	},
};