'use strict';

const path = require('path');
const oryx = require('@spryker/oryx');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getConfiguration(settings) {
    let devtool = 'cheap-source-map';
    let postCssPlugins = [];

    if (settings.options.isWatching) {
        devtool = 'cheap-module-eval-source-map';
    }

    if (settings.options.isProduction) {
        devtool = false;

        postCssPlugins = [
            autoprefixer({
                browsers: ['last 4 versions']
            })
        ];
    }

    let config = {
        context: settings.paths.rootDir,
        stats: settings.options.isVerbose ? 'verbose' : 'errors-only',
        devtool,

        watch: settings.options.isWatching,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 500,
            ignored: /(node_modules)/
        },

        entry: oryx.find(settings.entry),

        output: {
            path: settings.paths.publicDir,
            filename: `/js/[name].js`
        },

        resolve: {
            modules: oryx.find(settings.resolveModules, []).concat([
                'node_modules',
                settings.paths.sourcePath,
                settings.paths.bundlesPath
            ]),
            extensions: ['.js', '.css', '.scss'],
            alias: {
                ZedGui: `${settings.paths.guiFolder}/assets/Zed/js/modules/commons`,
                ZedGuiEditorConfiguration: `${settings.paths.guiFolder}/assets/Zed/js/modules/editor`,
                ZedGuiModules: `${settings.paths.guiFolder}/assets/Zed/js/modules`
            }
        },

        module: {
            rules: [{
                test: /\.css\??(\d*\w*=?\.?)+$/i,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [{
                        loader: 'css-loader',
                        query: {
                            sourceMap: !settings.options.isProduction
                        }
                    }, {
                        loader: 'resolve-url-loader',
                        query: {
                            sourceMap: !settings.options.isProduction
                        }
                    }]
                })
            }, {
                test: /\.scss$/i,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [{
                        loader: 'css-loader',
                        query: {
                            sourceMap: !settings.options.isProduction
                        }
                    }, {
                        loader: 'resolve-url-loader',
                        query: {
                            sourceMap: !settings.options.isProduction
                        }
                    }, {
                        loader: 'sass-loader',
                        query: {
                            sourceMap: true
                        }
                    }]
                })
            }, {
                test: /\.(ttf|woff2?|eot|svg|otf)\??(\d*\w*=?\.?)+$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '/fonts/[name].[ext]',
                        publicPath: settings.paths.publicPath
                    }
                }]
            }, {
                test: /\.(jpe?g|png|gif|svg)\??(\d*\w*=?\.?)+$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '/img/[name].[ext]',
                        publicPath: settings.paths.publicPath
                    }
                }]
            }]
        },

        plugins: [
            new webpack.LoaderOptionsPlugin({
                options: {
                    context: settings.paths.rootDir,
                    postcss: postCssPlugins,

                    // this is a fix for resolve-url-plugin
                    output: {
                        path: ''
                    }
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'spryker-zed-gui-commons',
                filname: 'assets/js/spryker-zed-gui-commons.js'
            }),
            new webpack.DefinePlugin({
                DEV: !settings.options.isProduction,
                WATCH: settings.options.isWatching,
                'require.specified': 'require.resolve'
            }),
            new webpack.ProvidePlugin({
                // jquery global
                $: 'jquery',
                jQuery: 'jquery',

                // legacy provider
                SprykerAjax: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAjax`,
                SprykerAjaxCallbacks: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks`,
                SprykerAlert: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAlert`
            }),
            new ExtractTextPlugin({
                filename: 'css/[name].css',
                allChunks: true
            })
        ]
    };

    if (settings.options.isProduction) {
        config.plugins = [
            ...config.plugins,
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,
                    source_map: null
                },
                sourceMap: true,
                mangle: false,
                compress: {
                    warnings: false,
                    dead_code: true
                }
            })
        ];
    }

    return config;
}

module.exports = getConfiguration;
