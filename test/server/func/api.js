'use strict';

var h = require('..');
h.r42.inject(function (_, /*!lib*/ app, requestFn, fs, path) {

  var config = {
    publicDir: path.join(__dirname, '../mock/public'),
    apiMockupDir: path.join(__dirname, '../mock/api_mockup'),
  };

  describe('API', function() {
    var request;

    before(function() {
      request = requestFn(app(_.merge({}, h.config.app, config, {
        fakeApi: false,
      })));
    });

    it('has a GET / route', function(done) {
      request
        .get('/')
        .expect(200, done);
    });

    describe('GET / route', function() {
      it('has no cache', function(done) {
        request
          .get('/')
          .expect('Pragma', 'no-cache')
          .expect('Cache-Control', 'no-cache', done);
      });

      it('expose public/index.html', function(done) {
        request
          .get('/')
          .expect('Content-Type', 'text/html')
          .end(h.dotry(function(err, res) {
            expect(err).to.not.exist;
            fs.readFile(path.join(config.publicDir, '/index.html'), {
              encoding: 'utf-8',
            }, h.dotry(function (err, data) {
              expect(err).to.not.exist;
              expect(res.text).to.equal(data);
            }, done));
          }, done, false));
      });
    });

    it('has no GET /api/ route', function(done) {
      request
        .get('/api/')
        .expect(404, done);
    });

    it('has no POST /api/ route', function(done) {
      request
        .post('/api/')
        .expect(404, done);
    });
  });

  describe('Dev API', function() {
    var request;

    before(function() {
      request = requestFn(app(_.merge({}, h.config.app, config, {
        fakeApi: true,
      })));
    });

    it('has a GET / route', function(done) {
      request
        .get('/')
        .expect(200, done);
    });

    it('has a GET /api/ route', function(done) {
      request
        .get('/api/')
        .expect(200, done);
    });

    it('has a POST /api/ route', function(done) {
      request
        .post('/api/')
        .expect(200, done);
    });

    describe ('GET /api/route', function() {
      it('return a 500 error if server/api_mockup/{params}/{method}.json not exist', function(done) {
        request
          .get('/api/falseTest')
          .expect(500, done);
      });

      it('expose server/api_mockup/{params}/{method}.json if it exists', function(done) {
        request
          .get('/api/')
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end(h.dotry(function(err, res) {
            expect(err).to.not.exist;
            fs.readFile(path.join(config.apiMockupDir, '/GET.json'), {
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
