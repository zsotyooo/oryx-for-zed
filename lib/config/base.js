const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function getBaseConfig(settings) { 
    let devtool = 'cheap-source-map';
    let postCssPlugins = [];

    // experimental
    if (settings.options.isBoost) {
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

    let baseConfig = {
        context: settings.paths.rootDir,
        stats: settings.options.isVerbose ? 'verbose' : 'errors-only',
        devtool,

        watch: settings.options.isWatching,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 500,
            ignored: /(node_modules)/
        },

        output: {
            path: settings.paths.publicDir,
            filename: './js/[name].js',
            publicPath: '/assets/'
        },

        resolve: {
            modules: oryx.find(settings.resolveModules, []).concat([
                'node_modules',
                settings.paths.sourcePath,
                settings.paths.bundlesPath
            ]),
            extensions: ['.js', '.json', '.css', '.scss']
        },

        module: {
            rules: [{
                test: /\.s?css$/i,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
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
            new webpack.DefinePlugin({
                DEV: !settings.options.isProduction,
                WATCH: settings.options.isWatching,
                'require.specified': 'require.resolve'
            }),
            new ExtractTextPlugin({
                filename: 'css/[name].css',
                allChunks: true
            })
        ]
    };

    if (settings.options.isProduction) {
        baseConfig.plugins = [
            ...baseConfig.plugins,
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,
                    source_map: true
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

    return baseConfig;
}

module.exports = getBaseConfig;
