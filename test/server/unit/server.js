'use strict';

var h = require('..');
var unit = h.r42.createSub({
  paths: {
    express: 'mock/express',
    fs: 'mock/fs',
    path: 'mock/path',
  }
});
unit.inject(function (/*!lib*/ appFn, express) {

  describe('Server', function() {
    var appInst;

    it('exist', function() {
      expect(appFn).to.exist;
    });

    it('is a function', function() {
      expect(appFn).to.be.a('Function');
    });

    it('is initialized with a configuration without error', function() {
      var fn = function() {
        appInst = appFn(h.config.app);
      };
      expect(fn).to.not.throw();
    });

    it('instanciate an express app', function() {
      expect(express).to.have.been.calledWithNew; 
    });

    it('return the express app', function() {
      expect(appInst).to.be.an.instanceof(express);
    });

    describe('not in fakeApi conf', function() {
      it('register a ALL /api/ route', function() {
        expect(express.$i.all).to.have.been.calledOnce
          .and.calledWith('/api/*');
      });
    });
  });
});