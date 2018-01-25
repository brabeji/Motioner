const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {

	entry: './index.js',

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js'
	},

	module: {

		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },

			{
				test: /\.(c|le)ss$/,
				exclude: /node_modules/,

				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: 'css-loader' },
						{
							loader: 'less-loader',
							options: {
								strictMath: true
							}
						}
					]
				})
			},
		]

	},

	plugins: [
		new ExtractTextPlugin({ filename: 'motioner.css', allChunks: true, }),
		new HtmlWebpackPlugin({ template: './index.html' })
	]
};
