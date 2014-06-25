'use strict';

var h = require('..');
var unit = h.r42.createSub({
  paths: {
    express: 'mock/express',
    'lib/route': 'spy!route',
  },
});
unit.inject(function (_, /*!lib*/ appFn, express, /*!lib/route*/ routes) {

  describe('Server', function() {
    var config = { publicDir: 'publicDir' };

    beforeEach(function() {
      express.reset();
      express.static.reset();
      h.reset(express.static.mime);
      routes.reset();
    });

    it('exist', function() {
      expect(appFn).to.exist;
    });

    it('is a function', function() {
      expect(appFn).to.be.a('Function');
    });

    it('instanciate an express app', function() {
      appFn(config);
      expect(express).to.have.been.calledWithNew;
    });

    it('configure a static server for static files', function() {
      appFn(config);
      expect(express.static.mime.define).to.have.been.calledOnce
        .and.calledWith({
          'application/x-font-woff': ['woff'],
          'application/x-font-ttf': ['ttf'],
          'application/vnd.ms-fontobject': ['eot'],
          'font/opentype': ['otf'],
          'text/css': ['css'],
        });
      expect(express.static).to.have.been.calledOnce
        .and.calledWith(config.publicDir, {
          maxAge: 0,
          index: '<noindex>',
        });
    });

    it('create a static server for static files', function() {
      var appIns = appFn(config);
      expect(appIns.use).to.have.been.calledOnce
        .and.calledWith(express.static());
    });

    it('call the routes, with the app and the config', function() {
      appFn(config);
      expect(routes).to.have.been.calledOnce
        .and.calledWith(express.$i, config);
    });

    it('return the express app', function() {
      expect(appFn(config)).to.be.an.instanceof(express);
    });
  });
});
