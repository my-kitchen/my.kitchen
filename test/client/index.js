'use strict';

var chai = require('chai');

chai.config.includeStack = true;
chai.use(require('chai-as-promised'));
global.expect = chai.expect;

module.exports = {
  homepage: require('./page/homepage'),
};
