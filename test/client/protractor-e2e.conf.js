// An example configuration file.
exports.config = {
  chromeOnly: true,
  chromeDriver: '../../node_modules/protractor/selenium/chromedriver',

  capabilities: {
    browserName: 'chrome'
  },

  specs: ['./e2e/**/*.js'],

  framework: 'mocha',
};
