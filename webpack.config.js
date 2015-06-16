var SRC_DIR
  , HtmlWebpackPlugin;

SRC_DIR = __dirname + '/src';
HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: SRC_DIR,
    entry: './entry.js',
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx' }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Fluxperiments'
        })
    ],
    resolve: {
        alias: {
            'React': 'react'
        },
        extensions: ['', '.js', '.jsx'],
        root: SRC_DIR
    }
}
