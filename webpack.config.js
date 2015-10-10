'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

  debug: true,
  devtool: 'source-map',
  watch: true,

  entry: {
    'index.ios': ['./src/main.ios.js'],
    'index.android': ['./src/main.android.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'babel?stage=0&optional=runtime'
      ]
    }]
  },

  resolve: { extensions: ['', '.js', '.es6'] },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};
