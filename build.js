'use strict';

const oryx = require('@spryker/oryx');
const api = require('./lib');

const configuration = api.getConfig(api.settings);
oryx.build(configuration);
