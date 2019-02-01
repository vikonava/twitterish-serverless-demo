const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  mode: 'production',
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
};
