'use strict';

var config = require('./config');
var r42 = require('r42').config(config.r42);
r42.inject(function (/*!lib*/ app) {

  var server = app(config.app).listen(process.env.PORT);
  console.log('Listening on port ' +
    process.env.PORT + ' - ' +
    process.env.NODE_ENV || 'dev' + ' mode');
});
