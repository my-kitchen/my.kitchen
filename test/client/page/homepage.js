'use strict';

module.exports = function AngularHomepage() {
  this.get = function() {
    browser.get('/');
  };
};
