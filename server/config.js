'use strict';

var baseDir = __dirname;
module.exports = {
  app: {
    fakeApi: false,
    baseDir: baseDir,
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
