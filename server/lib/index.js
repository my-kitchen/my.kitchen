'use strict';

define(function (express, /*!$route*/ routes) {

  return function(config) {
    var app = express();

    routes(app, config);

    return app;
  };
});
