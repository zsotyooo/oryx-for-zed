'use strict';

const sable = require('sable');
const api = require('./lib');

const configuration = api.getConfig(api.settings);
sable.build(configuration);
