'use strict';

var h = require('../..');
var unit = h.r42.createSub({
  paths: {
    'lib/route/api': 'spy!api',
    'lib/route/clientHtml': 'spy!clientHtml',
  },
});
unit.inject(function (_, /*!lib/route*/ routeFn, /*!lib/route/api*/ api, /*!lib/route/clientHtml*/ clientHtml) {
  
  describe('Route', function() {
    beforeEach(function() {
      api.reset();
      clientHtml.reset();
    });

    it('exist', function() {
      expect(routeFn).to.exist;
    });

    it('is a function', function() {
      expect(routeFn).to.be.a('Function');
    });

    it('call api, passing the app and the conf', function() {
      var app = {};
      var conf = {};
      routeFn(app, conf);
      expect(api).to.have.been.calledOnce
        .and.calledWith(app, conf);
    });

    it('call clientHtml, passing the app and the conf', function() {
      var app = {};
      var conf = {};
      routeFn(app, conf);
      expect(clientHtml).to.have.been.calledOnce
        .and.calledWith(app, conf);
    });
  });
});
