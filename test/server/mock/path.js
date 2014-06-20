'use strict';

var sinon = require('sinon');

var path = {};

path.join = sinon.stub().returns('right/path');

module.exports = path;
