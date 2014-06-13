'use strict';

var h = require('..');
h.r42.inject(function (/*!lib*/ app) {

  describe('Server', function() {
    it('exist', function() {
      expect(app).to.exist;
    });

    it('is a function', function() {
      expect(app).to.be.a('Function');
    });

    it('is initialized with a configuration without error', function() {
      var fn = function() {
        app(h.app);
      };
      expect(fn).to.not.throw;
    });
  });
});