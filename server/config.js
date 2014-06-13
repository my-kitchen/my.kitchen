'use strict';

module.exports = {
  app: {
    fakeApi: false,
  },

  r42: {
    baseDir: __dirname,
    require: require,

    paths: {
      pkg: 'json!../package',
      _: 'lodash',
    },
  },
};
