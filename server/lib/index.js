'use strict';

define(function (_, express, fs, path) {

  return function(config) {
    var app = express();

    if (config.fakeApi) {
      app.all('/api/*', function (req, res, next) {
        try {
          fs.readFile(
            path.join(__dirname, '../api_mockup', _.values(req.params).join('/'), req.method + '.json'),
            function (err, data) {
              if (err) {
                return next(err);
              }
              res.setHeader('Content-type', 'application/json; charset=utf-8');
              res.end(data);
            }
          );
        } catch (e) {
          return next(e);
        }
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
        path.join(__dirname, '../../client/html/index.html'),
        function (err, data) {
          res.setHeader('Content-Type', 'text/html');
          res.end(data);
        }
      );
    });

    return app;
  };
});