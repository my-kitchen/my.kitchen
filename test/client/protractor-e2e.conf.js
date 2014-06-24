// An example configuration file.
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
