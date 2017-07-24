const oryx = require('@spryker/oryx');
const webpack = require('webpack');
const webpackVersion = require('webpack/package').version;
const pkg = require('../package');

oryx.log.info(pkg.name, pkg.version);
oryx.build.loadCompiler(webpack, webpackVersion);

const settings = require('./settings');
const getBaseConfig = require('./config/base');
const getGuiConfig = require('./config/gui');

module.exports = {
    settings,
    getBaseConfig,
    getGuiConfig
};
