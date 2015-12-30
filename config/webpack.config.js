/* eslint-env node */
/* eslint camelcase:0 */

'use strict';

const path = require('path');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const parameters = require('./parameters.json');

const projectDir = path.resolve(__dirname + '/..');

function buildConfig(options) {
    const env = options.env || 'dev';
    const isDev = env === 'dev';
    const minify = options.minify != null ? !!options.minify : !isDev;

    return {
        entry: projectDir + '/src/bootstrap.js',
        output: {
            path: projectDir + '/web/build/',
            publicPath: parameters.publicPath,
            filename: isDev ? '[name].js' : '[name].[hash].js',
            chunkFilename: isDev ? '[name].js' : '[name].[hash].js',
        },
        debug: isDev,
        devtool: isDev ? 'cheap-module-source-map' : 'source-map',
        resolve: {
            alias: {
                config: projectDir + '/config/config-' + env + '.js',
                core: projectDir + '/src/core/',
            },
        },
        module: {
            loaders: [
                // Babel loader enables us to use ES2015 + react's JSX
                {
                    test: /\.js$/,
                    include: [projectDir + '/src', projectDir + '/config'],
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react'],
                    },
                },
                // Style loader enables us to import CSS files through normal imports
                {
                    test: /\.css$/,
                    include: [projectDir + '/src'],
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader'),
                },
                // JSON loader so that we can import json files, such as parameters.json
                {
                    test: /\.json$/,
                    include: [projectDir + '/src', projectDir + '/config'],
                    loader: 'json-loader',
                },
            ],
        },
        postcss: () => [
            // Auto prefix CSS based on https://github.com/ai/browserslist
            autoprefixer({ browsers: ['last 2 versions', 'IE >= 10'] }),
        ],
        plugins: [
            // Ensures that files with errors are produced
            new NoErrorsPlugin(),
            // Reduce react file size as well as other libraries
            new DefinePlugin({
                'process.env': {
                    NODE_ENV: '"' + (isDev ? 'development' : 'production') + '"',
                },
            }),
            // Move CSS styles to a separate file
            new ExtractTextPlugin(isDev ? 'app.css' : 'app.[hash].css', {
                allChunks: true,
                disable: isDev,
            }),
            // Minify JS
            minify && new UglifyJsPlugin({
                compressor: {
                    warnings: false,
                    drop_console: true,   // Drop console.* statements
                    drop_debugger: true,  // Drop debugger statements
                    screw_ie8: true,      // We don't support IE8 and lower, this further improves compression
                },
            }),
        ].filter((val) => !!val),
        // Dev server configuration
        devServer: {
            publicPath: parameters.publicPath,
            contentBase: projectDir + '/web/',
            filename: 'main.js',
            lazy: !isDev,
            historyApiFallback: true,
            stats: {
                colors: true,
            },
            // API proxies to circumvent CORS issues while developing
            // See available options in https://github.com/nodejitsu/node-http-proxy
            proxy: {
                '/api/*': {
                    target: 'https://mysite.com/api/',
                    secure: false,
                    prependPath: false,
                },
            },
        },
    };
}


// Do some trickery to export the config based on the running script name
// This allows us to use the webpack executable directly as well as supporting
// building the configuration dynamically
const isWebpackExecutable = /^webpack\-?/.test(path.basename(process.argv[1]));

module.exports = isWebpackExecutable ? buildConfig(require('yargs').argv) : buildConfig;
