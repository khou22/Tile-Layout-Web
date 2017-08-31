var webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: './src/index.jsx',
  target: "web", // What type of environment it'll be used in
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'index_bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
    devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: false,
          emitWarning: true
        }
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader", // JSX to JS
        options: {
          presets: ['airbnb']
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader" // Load the CSS
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Style nodes from JS strings
          },
          {
            loader: "css-loader" // CSS into CommonJS
          },
          {
            loader: "sass-loader" // Sass to CSS
          }
        ]
    },
    {
        test: /\.svg/,
        exclude: /node_modules/,
        loader: 'raw-loader'
    }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  stats: {
    colors: true,
    chunks: false
  }
}
