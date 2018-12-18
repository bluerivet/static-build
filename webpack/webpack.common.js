'use strict';

const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

const dest = Path.join(__dirname, '../dist');
const dirCont = fs.readdirSync(Path.resolve(__dirname,  '../src/html'));
const templateFiles = dirCont
    .filter(e => /.*\.(hbs)/gi.test(e))
    .map(f => {
        return f.split('.')[0];
    });

let wpPlugins = [
    new CleanWebpackPlugin([dest], { root: Path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../public'), to: 'public' }
    ])
];

wpPlugins = wpPlugins.concat(templateFiles.map(tf => newTemplate(tf)));

function newTemplate(fname) {
  let htmlPath = fname + '.html';
  let hbsPath = '../src/html/' + fname + '.hbs';
    return new HtmlWebpackPlugin({
      filename: htmlPath,
      template: Path.resolve(__dirname, hbsPath)
    });
}

module.exports = {
  entry: [
    Path.resolve(__dirname, './polyfills'),
    Path.resolve(__dirname, '../src/scripts/index')
  ],
  output: {
    path: dest,
    filename: 'app.[hash].js'
  },
  plugins: wpPlugins,
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
      { 
        test: /\.hbs$/, 
        loader: "handlebars-loader",
        options: {
          runtime: Path.resolve(__dirname, '../handlebars.js'),
          precompileOptions: {
            knownHelpersOnly: false
          }
        }
      }
    ]
  }
};
