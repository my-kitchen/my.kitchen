'use strict';

var config = require('./config');
var r42 = require('r42').config(config.r42);
r42.inject(function (/*!lib*/ app) {

  var server = app(config.app).listen(8000);
  console.log('Listening on port 8000 - dev mode');
});
