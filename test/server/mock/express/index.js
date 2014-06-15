'use strict';

var sinon = require('sinon');
var _ = require('lodash');
var h = require('../..');

var Request = require('./request');
var Response = require('./response');

var Express = function() {
  if (!(this instanceof Express)) {
    return h.oh.newApply(Express, arguments);
  }

  Express.called = true;
  Express.$i = this;
};
_.extend(Express, sinon.spy());
Express.$i = null;

Express.prototype.all = sinon.stub().callsArgWith(1, new Request(), new Response());
Express.prototype.get = sinon.stub().callsArg(1);

module.exports = Express;
