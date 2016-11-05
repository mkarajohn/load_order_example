'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    node_modules: path.resolve(__dirname, 'node_modules'),
    js: path.resolve(__dirname, 'src', 'js'),
    css: path.resolve(__dirname, 'src', 'css'),
    build: path.join(__dirname, 'build')
};

var config = {
    devtool: 'eval',
    entry: {
        main: [
            'app.js',
            'app.scss'
        ]
    },
    output: {
        path: PATHS.build,
        filename: '[name].bundle.js'
    },
    resolve: {
        root: [
            path.resolve(__dirname),
            PATHS.node_modules,
            PATHS.js,
            PATHS.css
        ],
        extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass')
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.gif$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new ExtractTextPlugin('[name].bundle.css', {
            allChunks: true
        })
    ]
};

module.exports = config;
