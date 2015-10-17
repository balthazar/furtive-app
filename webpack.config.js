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
    }, {
      test: /\.js$/,
      exclude: /node_modules\/.*\/node_modules/,
      include: [
        path.resolve(__dirname, 'node_modules/react-native-navbar'),
        path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
        path.resolve(__dirname, 'node_modules/react-native-spinkit'),
        path.resolve(__dirname, 'node_modules/react-native-network-scan')
      ],
      loader: 'babel?stage=0'
    }]
  },

  resolve: { extensions: ['', '.js'] },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};
