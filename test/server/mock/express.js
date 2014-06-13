'use strict';

var sinon = require('sinon');
var _ = require('lodash');

var express = function() {
  if (!(this instanceof express)) {
    return require('..').oh.newApply(express, arguments);
  }

  return _.extend(this, {
    all: sinon.spy(),
    get: sinon.spy(),
  });
};

express.init = function() {
  express.spy = sinon.spy();
};

module.exports = express;
