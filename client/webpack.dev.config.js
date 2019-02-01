const path = require('path');
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rtl = require('postcss-rtl');
const browserslist = require('browserslist-config-terra');

module.exports = {
  mode: 'development',
  entry: {
    'app': path.resolve(path.join(__dirname, 'src/Index.jsx')),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
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
  devtool: 'cheap-source-map',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: true,
      warnings: true,
    },
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  resolveLoader: {
    modules: [path.resolve(path.join(__dirname, 'node_modules'))],
  },
  node: {
    fs: 'empty',
  },
}
