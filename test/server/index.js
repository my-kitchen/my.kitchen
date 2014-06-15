'use strict';

var _ = require('lodash');
var path = require('path');
var sinon = require('sinon');

var chai = require('chai');
chai.config.includeStack = true;
chai.use(require('sinon-chai'));
global.expect = chai.expect;

/**
 * Allow to handle thrown exceptions during
 * sync-ed tests, handling done call
 *
 * @param done {Function} called to stop the async assertion
 * @param [last=true] {Boolean} define if the dotry is called
 *   for the last time, so done can be called
 */
var dotry = function(fn, done, last) {
  if (_.isUndefined(last)) {
    last = true;
  }

  return function() {
    try {
      fn.apply(this, arguments);
      if (last) {
        done(null);
      }
    } catch (e) {
      done(e);
    }
  };
};

var config = require('../../server/config');

_.merge(config.r42, {
  paths: {
    requestFn: 'supertest',
    mock: path.join(config.r42.baseDir, '../test/server/mock'),
  },
});

var r42 = require('r42').config(config.r42);
module.exports = {
  r42: r42,
  config: config,
  sinon: {
    spy: function(object, methodName) {
      return function() {
        if (_.isFunction(object)) {
          object = object();
        }

        sinon.spy(object, methodName);
      };
    },
    restore: function(object, methodName) {
      return function() {
        if (_.isFunction(object)) {
          object = object();
        }
        
        if (!object[methodName].restore) {
          return;
        }
        object[methodName].restore();
      };
    },
  },
  oh: {
    newApply: function(Ctor, args) {
      Array.prototype.unshift.call(args, Ctor);
      return new (Function.prototype.bind.apply(Ctor, arguments));
    },
  },
  dotry: dotry,
};
