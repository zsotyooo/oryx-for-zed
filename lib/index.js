'use strict';

const oryx = require('@spryker/oryx');
const pkg = require('../package.json');

oryx.log.step('using', pkg.name, pkg.version);

const settings = require('./settings');
const getConfiguration = require('./webpack.config');

module.exports = {
    settings,
    getConfiguration
};
