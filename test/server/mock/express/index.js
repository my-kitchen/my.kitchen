'use strict';

var sinon = require('sinon');
var _ = require('lodash');
var h = require('../..');

var Request = require('./request');
var Response = require('./response');
var Middleware = require('./middleware');

var Express = function() {
  if (!(this instanceof Express)) {
    return h.newApply(Express, arguments);
  }

  Express.called = true;
  Express.$i = this;

  var req, res, next;

  // use
  this.use = sinon.spy();

  // all
  req = new Request();
  res = new Response();
  next = new Middleware();
  this.all = sinon.stub().callsArgWith(1, req, res, next);
  this.all.req = req;
  this.all.res = res;
  this.all.next = next;

  // get
  req = new Request();
  res = new Response();
  next = new Middleware();
  this.get = sinon.stub().callsArgWith(1, req, res, next);
  this.get.req = req;
  this.get.res = res;
  this.get.next = next;
};
_.extend(Express, sinon.spy());
Express.$i = null;

// static
Express.static = sinon.spy();
Express.static.mime = {
  define: sinon.spy(),
};

module.exports = Express;
