const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const entry = path.resolve(__dirname, 'src', 'index.js');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	entry,
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
		new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			template: './template.html'
		}),
	],
	optimization: {
		splitChunks: {
			name: false,
		}
	},
	output: {
		library: 'CombaseWidget',
    	libraryTarget: 'umd',
		filename: '[name].[contenthash].js',
		path: outputPath,
	},
};