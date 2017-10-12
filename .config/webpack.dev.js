// Imports
const path = require('path');
const webpack = require('webpack');

// Plugins
const HotModuleReplacement = webpack.HotModuleReplacementPlugin,
  AutogenerateHTML = require('html-webpack-plugin');

// Config
module.exports = {
  target: 'web',
  devtool: 'eval-source-map',

  context: path.resolve(__dirname, '..'),
  entry: {
    'app/app': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../.build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: [
      '.js', '.ts', '.json'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@app': path.resolve(__dirname, '..', 'src/app'),

      '@styles': path.resolve(__dirname, '..', 'src/assets/styles')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  devServer: {
    hot: true,
    port: 8000,
    historyApiFallback: true
  },

  plugins: [
    new HotModuleReplacement(),
    new AutogenerateHTML({
      template: './src/index.html',
      inject: 'body'
    })
  ]
};