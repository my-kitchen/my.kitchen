'use strict';

var sinon = require('sinon');

var Response = function() {

  this.send = sinon.spy();
  this.setHeader = sinon.spy();
  this.set = sinon.spy();
  this.end = sinon.spy();
};

module.exports = Response;
