const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/js/motioner.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'motioner.js'
	},

	module: {

		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      		
      		{
      			test: /\.less$/,
      			exclude: /node_modules/,
      			use: [
      				{loader: 'style-loader'},
      				{loader: 'css-loader'},
      				{
      					loader: 'less-loader',
      					options: {
      						strictMath: true
      					}
      				}
      			]
      		},

                  
		]

	},

	plugins: [
            
		new HtmlWebpackPlugin({template: './src/index.html'})

	]

}