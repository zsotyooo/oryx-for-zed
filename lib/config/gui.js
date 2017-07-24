const path = require('path');
const oryx = require('@spryker/oryx');
const webpack = require('webpack');
const merge = require('webpack-merge');
const getBaseConfig = require('./base');

function getGuiConfig(settings) {
    const baseConfig = getBaseConfig(settings);

    let guiConfig = merge(baseConfig, {
        entry: oryx.find(settings.entry),

        resolve: {
            alias: {
                ZedGui: `${settings.paths.guiFolder}/assets/Zed/js/modules/commons`,
                ZedGuiEditorConfiguration: `${settings.paths.guiFolder}/assets/Zed/js/modules/editor`,
                ZedGuiModules: `${settings.paths.guiFolder}/assets/Zed/js/modules`
            }
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'spryker-zed-gui-commons',
                filename: './js/spryker-zed-gui-commons.js'
            }),
            new webpack.ProvidePlugin({
                // jquery global
                $: 'jquery',
                jQuery: 'jquery',

                // legacy provider
                SprykerAjax: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAjax`,
                SprykerAjaxCallbacks: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks`,
                SprykerAlert: `${settings.paths.guiFolder}/assets/Zed/js/modules/legacy/SprykerAlert`
            })
        ]

    });

    return guiConfig;
}

module.exports = getGuiConfig;
