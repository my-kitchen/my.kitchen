'use strict';

var r42 = require('r42').config(require('./config').r42);
r42.inject(function (express, fs, path) {

  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.all('/api/*', function (req, res) {
      fs.readFile(
        path.join(__dirname, 'api-mockups', req.params.join('/'), req.method + '.json'),
        function (err, data) {
          if (handleErrors(err, res)) return;
          res.setHeader('Content-type', 'application/json; charset=utf-8');
          res.end(data);
        }
      );
    });
  }
  else {
    app.all('/api/*', function (req, res) {
      res.send(404);
    });
  }

  app.get('/*', function(req, res) {
    res.set('Pragma', 'no-cache');
    res.set('Cache-Control', 'no-cache');

    fs.readFile(
      path.join(__dirname, '../client/html/index.html'),
      function (err, data) {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    );
  });

  var server = app.listen(8000);
  console.log('Listening on port 8000 - dev mode');
});