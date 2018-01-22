const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
	
      entry: './src/js/motioner.js',
	
      output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/motioner.js',
            libraryTarget: 'var',
            library: 'Motioner'
	},

	module: {

		rules: [
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      		
      		{
      			test: /\.less$/,
      			exclude: /node_modules/,

                        use: ExtractTextPlugin.extract({
                              fallback: "style-loader",
                              use: [
                                    {loader: 'css-loader'},
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
            new ExtractTextPlugin({filename: 'css/motioner.css', allChunks: true,}),
		new HtmlWebpackPlugin({template: './src/index.html'})
	]

}