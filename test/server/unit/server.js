'use strict';

var h = require('..');
var unit = h.r42.createSub({
  paths: {
    express: 'mock/express',
    fs: 'mock/fs',
    path: 'mock/path',
  }
});
unit.inject(function (/*!lib*/ app, express) {

  describe('Server', function() {
    it('exist', function() {
      expect(app).to.exist;
    });

    it('is a function', function() {
      expect(app).to.be.a('Function');
    });

    it('is initialized with a configuration without error', function() {
      var fn = function() {
        app(h.config.app);
      };
      expect(fn).to.not.throw();
    });

    it('instanciate an express app', function() {
      app(h.config.app);
      expect(express.withNew).to.be.true; 
    });
  });
});