'use strict';

var path = require('path');

var baseDir = __dirname;
module.exports = {
  app: {
    fakeApi: true,
    apiMockupDir: path.join(baseDir, '/api_mockup'),
    publicDir: path.join(baseDir, '../public'),
  },

  r42: {
    baseDir: baseDir,
    require: require,

    paths: {
      pkg: 'json!../package',
      _: 'lodash',
    },
  },
};
