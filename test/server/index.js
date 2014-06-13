'use strict';

var _ = require('lodash');

var chai = require('chai');
chai.config.includeStack = true;
global.expect = chai.expect;

/**
 * Allow to handle thrown exceptions during
 * sync-ed tests, handling done call
 *
 * @param done {Function} called to stop the async assertion
 * @param [last=true] {Boolean} define if the dotry is called
 *   for the last time, so done can be called
 */
Function.prototype.dotry = function(done, last) {
  var fn = this;

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
  },
});

var r42 = require('r42').config(config.r42);
module.exports = {
  r42: r42,
  config: config,
};
