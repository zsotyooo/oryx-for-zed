'use strict';

const oryx = require('oryx');
const pkg = require('../package.json');

oryx.log.step('using', pkg.name, pkg.version);

const settings = require('./settings');
const getConfig = require('./webpack.config');

module.exports = {
    settings,
    getConfig
};
