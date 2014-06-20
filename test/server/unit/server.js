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
    beforeEach(function() {
      express.reset();
      routes.reset();
    });

    it('exist', function() {
      expect(appFn).to.exist;
    });

    it('is a function', function() {
      expect(appFn).to.be.a('Function');
    });

    it('instanciate an express app', function() {
      appFn(h.config.app);
      expect(express).to.have.been.calledWithNew; 
    });

    it('call the routes, with the app and the config', function() {
      appFn(h.config.app);
      expect(routes).to.have.been.calledOnce
        .and.calledWith(express.$i, h.config.app);
    });

    it('return the express app', function() {
      expect(appFn(h.config.app)).to.be.an.instanceof(express);
    });
  });
});
