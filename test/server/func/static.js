'use strict';

var h = require('..');
h.r42.inject(function (_, /*!lib*/ app, requestFn, fs, path) {

  var config = {
    publicDir: path.join(__dirname, '../mock/public'),
    apiMockupDir: path.join(__dirname, '../mock/api_mockup'),
  };

  describe('Static files', function() {
    var request;

    before(function() {
      request = requestFn(app(_.merge({}, h.config.app, config)));
    });

    it('expose static files', function(done) {
      request
        .get('/css/exist.css')
        .expect(200, done);
    });

    describe('GET /css/exist.css static file', function() {
      it('has a max-age of 0', function(done) {
        request
          .get('/css/exist.css')
          .expect('Cache-Control', 'public, max-age=0', done);
      });

      it('expose /css/exist.css', function(done) {
        request
          .get('/css/exist.css')
          .expect('Content-Type', 'text/css; charset=UTF-8')
          .end(h.dotry(function(err, res) {
            expect(err).to.not.exist;
            fs.readFile(path.join(config.publicDir, '/css/exist.css'), {
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
