const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const pcg = require('../package.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const version = process.env.PACKAGE_VERSION || pcg.version;

module.exports = {
  stats: 'errors-only',
  entry: {
    content: ['./src/content.js'], // TODO fix AutoRefreshPlugin to work without []
    index: './src/popup/chromePlugin.js',
    background: './src/background/background.js',
    // blureforsensitive: './src/blure-for-sensitive/blurSensitive.js',
    contextMenu: './src/contextMenu.js',
    tetrisPlanningOpenModal: './src/tetris-planning/openModal.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimaze: true,
            attrs: [':data-src'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new CopyWebpackPlugin([
      { from: './src/issue/img/**/*', to: './img', flatten: true },
      { from: './src/assets/**/*', to: './src', flatten: true },
      { from: './src/manifest.json', to: './' },
      { from: './src/person-limits/nativeModalScript.js', to: './' },
      { from: './src/blur-for-sensitive/blurSensitive.css', to: './src', flatten: true },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'jira-helper',
      template: path.resolve(__dirname, '../src/popup/chromePlugin.html'),
      inject: 'head',
      files: {
        js: ['chromePlugin.js'],
        css: ['chromePlugin.css'],
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'background.html',
      title: 'background',
      template: path.resolve(__dirname, '../src/background/background.html'),
      inject: 'head',
      chunks: ['background'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PACKAGE_VERSION': JSON.stringify(version),
    }),
    {
      apply(compiler) {
        compiler.hooks.afterEmit.tap('SetVersionPlugin', () => {
          const manifest = require('../dist/manifest.json');

          manifest.version = version;

          fs.promises.writeFile(path.resolve(__dirname, '../dist/manifest.json'), JSON.stringify(manifest, null, 2));
        });
      },
    },
  ],
};
