'use strict';

const impala = require('impala');
const api = require('./lib');

impala.build(api.getConfig(api.settings));
