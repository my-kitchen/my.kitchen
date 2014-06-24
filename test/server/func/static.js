'use strict';

var h = require('..');
h.r42.inject(function (_, /*!lib*/ app, requestFn, fs, path) {

  describe('Static files', function() {
    var request;

    before(function() {
      request = requestFn(app(h.config.app));
    });

    it('expose static files', function(done) {
      request
        .get('/0.0.0/css/bootstrap.css')
        .expect(200, done);
    });

    describe('GET /0.0.0/css/bootstrap.css static file', function(done) {
      it('has a max-age of 0', function(done) {
        request
          .get('/0.0.0/css/bootstrap.css')
          .expect('Cache-Control', 'public, max-age=0', done);
      });

      it('expose /0.0.0/css/bootstrap.css', function(done) {
        request
          .get('/0.0.0/css/bootstrap.css')
          .expect('Content-Type', 'text/css; charset=UTF-8')
          .end(h.dotry(function(err, res) {
            expect(err).to.not.exist;
            fs.readFile(path.join(__dirname, '../../../public/0.0.0/css/bootstrap.css'), {
              encoding: 'utf-8',
            }, h.dotry(function (err, data) {
              expect(err).to.not.exist;
              expect(res.text).to.equal(data);
            }, done));
          }, done, false));
      });
    });
  });
});
