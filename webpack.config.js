const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './src/index.jsx',
    target: "web", // What type of environment it'll be used in
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index_bundle.js',
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
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
        }],
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          // A common mistake is not stringifying the "production" string.
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ],
    stats: {
        colors: true,
        chunks: false
  }
}
