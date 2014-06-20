'use strict';

module.exports = function AngularHomepage() {
  this.get = function() {
    browser.get('http://127.0.0.1:9000/');
  };
};
