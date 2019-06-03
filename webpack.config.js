const path = require('path');
const baseUrl = require('./jsconfig.json').compilerOptions.baseUrl;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV.split('+').includes('production');

module.exports = {
	mode: production ? 'production' : 'development',
	devtool: production ? '' : 'source-map',
	entry: [
		'./example-react/index.js',
	],
	output: {
		filename: 'bundle-[hash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, baseUrl, 'index.html'),
		}),
	],
	devServer: {
		port: 8080,
		https: false,
		historyApiFallback: true,
	},
	resolve: {
		modules: [
			path.resolve(__dirname, baseUrl),
			'node_modules',
		],
	},
};