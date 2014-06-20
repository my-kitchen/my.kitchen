'use strict';

var sinon = require('sinon');

var fs = {};

fs.readFile = null;

fs.$c = {};
fs.$e = null;
fs.$c.readFile = {
  throw: function(fs) {
    fs.$e = new Error('fail');
    fs.readFile = sinon.stub().throws(fs.$e);
  },
  fail: function(fs) {
    fs.$e = new Error('fail');
    fs.readFile = sinon.stub().callsArgWith(1, fs.$e);
  },
  success: function(fs) {
    fs.readFile = sinon.stub().callsArgWith(1, null, 'readFileBuffer');
  },
};

fs.$c.readFile.success(fs);

module.exports = fs;
