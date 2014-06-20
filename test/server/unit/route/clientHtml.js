'use strict';

var h = require('../..');
var unit = h.r42.createSub({
  paths: {
    express: 'mock/express',
    fs: 'mock/fs',
    path: 'mock/path',
  }
});
unit.inject(function (/*!lib/route/clientHtml*/ clientHtmlFn, express, fs, path) {

  describe('HTML route', function() {
    beforeEach(function() {
      h.reset(fs);
      h.reset(path);
      clientHtmlFn(new express(), { baseDir: h.config.r42.baseDir });
    });

    it('exist', function() {
      expect(clientHtmlFn).to.exist;
    });

    it('is a function', function() {
      expect(clientHtmlFn).to.be.a('Function');
    });

    it('register a GET / route', function() {
      expect(express.$i.get).to.have.been.calledOnce
        .and.calledWith('/*');
    });

    describe('register a GET / route that', function() {
      it('set cache control headers', function() {
        expect(express.$i.get.res.set).to.have.been.called
          .and.calledWith('Pragma', 'no-cache');
        expect(express.$i.get.res.set).to.have.been.calledTwice
          .and.calledWith('Cache-Control', 'no-cache');
      });

      it('create a static path', function() {
        expect(path.join).to.have.been.calledOnce
          .and.calledWith(
            h.config.r42.baseDir,
            '../public/index.html'
          );
      });

      it('read the assembled path', function() {
        expect(fs.readFile).to.have.been.calledOnce
          .and.calledWith('right/path');
      });

      describe('if reading file fails by throwing an error', function() {
        before(function() {
          fs.$c.readFile.throw(fs);
          clientHtmlFn(new express(), { baseDir: h.config.r42.baseDir });
        });

        it('return the error', function() {
          expect(express.$i.get.next).to.have.been.calledOnce
            .and.calledWith(fs.$e);
        });
      });

      describe('if reading file fails by returning an error', function() {
        before(function() {
          fs.$c.readFile.fail(fs);
          clientHtmlFn(new express(), { baseDir: h.config.r42.baseDir });
        });

        it('return the error', function() {
          expect(express.$i.get.next).to.have.been.calledOnce
            .and.calledWith(fs.$e);
        });
      });

      describe('if reading file succeeds', function() {
        before(function() {
          fs.$c.readFile.success(fs);
          clientHtmlFn(new express(), { baseDir: h.config.r42.baseDir });
        });

        it('set a content-type specific header', function() {
          expect(express.$i.get.res.setHeader).to.have.been.calledOnce
            .and.calledWith('Content-Type', 'text/html');
        });

        it('forward the read file buffer', function() {
          expect(express.$i.get.res.end).to.have.been.calledOnce
            .and.calledWith('readFileBuffer');
        });
      });
    });
  });
});
