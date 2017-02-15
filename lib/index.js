'use strict';

const impala = require('impala');
const pkg = require('../package.json');

impala.log.step('using', pkg.name, pkg.version);

const settings = require('./settings');
const getConfig = require('./webpack.config');

module.exports = {
    settings,
    getConfig
};
