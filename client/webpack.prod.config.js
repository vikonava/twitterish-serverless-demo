const path = require('path');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rtl = require('postcss-rtl');
const browserslist = require('browserslist-config-terra');

module.exports = {
  mode: 'production',
  entry: {
    'app': path.resolve(path.join(__dirname, 'src/Index.jsx')),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              // Add unique ident to prevent the loader from searching for a postcss.config file. Additionally see: https://github.com/postcss/postcss-loader#plugins
              ident: 'postcss',
              plugins() {
                return [
                  rtl(),
                  Autoprefixer({ browsers: browserslist }),
                ];
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new webpack.NamedChunksPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  resolveLoader: {
    modules: [path.resolve(path.join(__dirname, 'node_modules'))],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    fs: 'empty',
  },
}

