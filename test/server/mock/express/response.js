'use strict';

var sinon = require('sinon');
//var _ = require('lodash');
//var h = require('..');

var Response = function() {
};

Response.prototype.send = sinon.spy();

module.exports = Response;
