'use strict';

define(function (express, /*!$route*/ routes) {

  return function(config) {
    var app = express();

    express.static.mime.define({
      'application/x-font-woff': ['woff'],
      'application/x-font-ttf': ['ttf'],
      'application/vnd.ms-fontobject': ['eot'],
      'font/opentype': ['otf'],
      'text/css': ['css'],
    });

    app.use(express.static(config.publicDir, {
      maxAge: 0,
      index: '<noindex>', // prevent index from being returned by static
    }));

    routes(app, config);

    return app;
  };
});
