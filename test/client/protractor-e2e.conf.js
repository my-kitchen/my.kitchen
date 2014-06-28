'use strict';

var chai = require('chai');
chai.config.includeStack = true;
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
global.expect = chai.expect;

exports.config = {
  chromeOnly: true,
  chromeDriver: '../../node_modules/protractor/selenium/chromedriver',

  capabilities: {
    browserName: 'chrome'
  },

  specs: ['./e2e/**/*.js'],

  framework: 'mocha',

  baseUrl: 'http://127.0.0.1:9000/',
};
