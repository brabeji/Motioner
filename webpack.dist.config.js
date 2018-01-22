const path = require('path');
var devConfig = require('./webpack.config.js');

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');

devConfig.plugins.push(
	new webpack.optimize.UglifyJsPlugin({compress: true})
);


devConfig.plugins.push(
	new OptimizeCssAssetsPlugin({
	      assetNameRegExp: /\.css$/g,
	      cssProcessor: require('cssnano'),
	      cssProcessorOptions: { discardComments: {removeAll: true } },
	      canPrint: true
	    })
);



module.exports = devConfig;