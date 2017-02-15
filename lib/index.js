'use strict';

const sable = require('sable');
const pkg = require('../package.json');

sable.log.step('using', pkg.name, pkg.version);

const settings = require('./settings');
const getConfig = require('./webpack.config');

module.exports = {
    settings,
    getConfig
};
