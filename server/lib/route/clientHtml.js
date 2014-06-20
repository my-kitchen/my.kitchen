'use strict';

define(function(fs, path) {

  return function(app, config) {

    app.get('/*', function(req, res, next) {
      res.set('Pragma', 'no-cache');
      res.set('Cache-Control', 'no-cache');

      try {
        fs.readFile(
          path.join(config.baseDir, '../public/index.html'),
          function (err, data) {
            if (err) {
              return next(err);
            }

            res.setHeader('Content-Type', 'text/html');
            res.end(data);
          }
        );
      } catch (e) {
        return next(e);
      }
    });
  };
});
