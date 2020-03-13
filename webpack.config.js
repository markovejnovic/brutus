/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

let entry = {
  background: 'background.js'
}
let outputPath = path.join(__dirname, 'extension', 'dist');

if (process.env.TESTBUILD) {
  entry = glob.sync(path.join(__dirname, "/test/**/*.test.js"));
  outputPath = path.join(__dirname, "/test-dist/");
}

module.exports = {
  mode: 'development',

  entry: entry,

  output: {
    path: outputPath,
    filename: '[name].js'
  },

  module: {
    rules: [{
      exclude: [path.resolve(__dirname, 'node_modules')],
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader'
        },
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  devtool: 'sourcemap',
};
