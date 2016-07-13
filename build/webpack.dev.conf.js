var config            = require('../config')
var webpack           = require('webpack')
var merge             = require('webpack-merge')
var utils             = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})



module.exports = merge(baseWebpackConfig, {
  module : {
    loaders: utils.styleLoaders()
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      chunks  : ['main-app'],
      inject  : true
    }),
    new HtmlWebpackPlugin({
      filename: 'render.html',
      template: 'render.html',
      chunks  : ['main-render'],
      inject  : true
    })
  ]
})
