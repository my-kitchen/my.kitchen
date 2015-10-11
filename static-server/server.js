'use strict';

var path = require('path');
var express = require('express');
var app = express();

express.static.mime.define({
  'application/x-font-woff': ['woff'],
  'application/x-font-ttf': ['ttf'],
  'application/vnd.ms-fontobject': ['eot'],
  'font/opentype': ['otf'],
  'text/css': ['css'],
});

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, '../public/index.html'));
});
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: 0,
  index: '<noindex>', // prevent index from being returned by static
}));

app.listen(process.env.NODE_PORT, function() {
  console.log('Listening on port ' +
    process.env.NODE_PORT + ' - ' +
    process.env.NODE_ENV + ' mode');
});
