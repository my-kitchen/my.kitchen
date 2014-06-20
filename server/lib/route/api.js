'use strict';

define(function(_, fs, path) {

  return function(app, config) {
    if (config.fakeApi) {
      app.all('/api/*', function (req, res, next) {
        try {
          fs.readFile(
            path.join(config.baseDir, 'api_mockup', _.values(req.params).join('/'), req.method + '.json'),
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
      return;
    }

    app.all('/api/*', function (req, res) {
      res.send(404);
    });
  };
});
