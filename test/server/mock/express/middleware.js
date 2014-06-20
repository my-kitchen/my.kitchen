'use strict';

var sinon = require('sinon');

var Middleware = function() {
  return sinon.spy();
};

module.exports = Middleware;
