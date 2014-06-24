'use strict';

var _ = require('lodash');
var path = require('path');
var sinon = require('sinon');

var chai = require('chai');
chai.config.includeStack = true;
chai.use(require('sinon-chai'));
global.expect = chai.expect;

// load r42 custom spy loader
var r42 = require('r42');
r42.registerLoader('spy', function(moduleDef, parent, mc) {
  mc.initModule(moduleDef, sinon.spy());
});

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

var newApply = function(Ctor, args) {
  Array.prototype.unshift.call(args, Ctor);
  // jshint ignore:start
  return new (Function.prototype.bind.apply(Ctor, arguments));
  // jshint ignore:end
};

var reset = function(obj) {
  _.forOwn(obj, function(val) {
    if (!val) {
      return;
    }

    if (val.reset && _.isFunction(val.reset)) {
      val.reset();
      return;
    }

    if (_.isObject(val)) {
      reset(val);
    }
  });
};

// configuration and r42 in test
var config = require('../../server/config');

_.merge(config.r42, {
  paths: {
    requestFn: 'supertest',
    mock: path.join(config.r42.baseDir, '../test/server/mock'),
  },
});
var r42 = r42.config(config.r42);

// export helper object
module.exports = {
  r42: r42,
  config: config,
  sinon: sinon,
  newApply: newApply,
  dotry: dotry,
  reset: reset,
};
