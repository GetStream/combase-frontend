const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const entry = path.resolve(__dirname, 'src', 'index.js');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	entry,
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
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
		extensions: ['.js', '.jsx'],
		alias: {
			'@combase.app/ui': '@combase.app/ui/src',
		}
	},
	plugins: [
		new webpack.IgnorePlugin({
			resourceRegExp: /^\.\/styles$/,
			contextRegExp: /react-file-utils$/,
		}),
		new BundleAnalyzerPlugin(),
		new CompressionPlugin(),
		new HtmlWebpackPlugin({
			inject: false,
			scriptLoading: 'blocking',
			templateContent: ({ htmlWebpackPlugin }) => `
			<!DOCTYPE html>
				<html lang="en">
					<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#000000" />
					<meta name="description" content="Combase Widget Test" />
					<title>title</title>
				
					<style>
						html,
						body {
						width: 100%;
						height: 100%;
						overflow: hidden;
						margin: 0;
						background-color: #fcfcfc;
						}
					</style>
					${htmlWebpackPlugin.tags.headTags}
					</head>
					<body>
					<noscript>You need to enable JavaScript to run this app.</noscript>
					<div id="root">
						<div id="combase_widget"></div>
					</div>
					${htmlWebpackPlugin.tags.bodyTags}
					<script type="text/javascript">
						window.CombaseWidget.init({
							el: '#combase_widget', // <-- TODO
							organization: "60b0c9215716b8022249ed7e", // <-- replace this with your Organization ID
							theme: 'light',
						});
					</script>
					</body>
				</html>
			`,
		}),
	],
	optimization: {
		splitChunks: {
			name: false,
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules\/(react|react-dom|styled-components)[\\/]/,
					name: "vendor",
					chunks: "all",
					reuseExistingChunk: true,
				}
			}
		}
	},
	output: {
		library: 'CombaseWidget',
    	libraryTarget: 'umd',
		filename: '[name].[contenthash].js',
		path: outputPath,
	},
};