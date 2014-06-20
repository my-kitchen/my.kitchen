'use strict';

var h = require('../..');
var unit = h.r42.createSub({
  paths: {
    express: 'mock/express',
    fs: 'mock/fs',
    path: 'mock/path',
  }
});
unit.inject(function (/*!lib/route/api*/ apiFn, express, fs, path) {

  describe('API routes', function() {
    it('exist', function() {
      expect(apiFn).to.exist;
    });

    it('is a function', function() {
      expect(apiFn).to.be.a('Function');
    });

    describe('not in fakeApi conf', function() {
      before(function() {
        apiFn(new express(), { fakeApi: false });
      });

      it('register an ALL /api/ route', function() {
        expect(express.$i.all).to.have.been.calledOnce
          .and.calledWith('/api/*');
      });

      describe('register an ALL /api/ route that', function() {
        it('send a 404 response', function() {
          expect(express.$i.all.res.send).to.have.been.calledOnce
            .and.calledWith(404);
        });
      });
    });

    describe('in fakeApi conf', function() {
      var config = {
        fakeApi: true,
        baseDir: h.config.r42.baseDir,
      };

      before(function() {
        apiFn(new express(), config);
      });

      it('register an ALL /api/ route', function() {
        expect(express.$i.all).to.have.been.calledOnce
          .and.calledWith('/api/*');
      });

      describe('register an ALL /api/ route that', function() {
        it('create a path from req.params', function() {
          expect(path.join).to.have.been.calledOnce
            .and.calledWith(
              config.baseDir,
              'api_mockup',
              'param1/param2',
              'GET.json'
            );
        });

        it('read the assembled path', function() {
          expect(fs.readFile).to.have.been.calledOnce
            .and.calledWith('right/path');
        });

        describe('if reading file fails by throwing an error', function() {
          before(function() {
            fs.$c.readFile.throw(fs);
            apiFn(new express(), config);
          });

          it('return the error', function() {
            expect(express.$i.all.next).to.have.been.calledOnce
              .and.calledWith(fs.$e);
          });
        });

        describe('if reading file fails by returning an error', function() {
          before(function() {
            fs.$c.readFile.fail(fs);
            apiFn(new express(), config);
          });

          it('return the error', function() {
            expect(express.$i.all.next).to.have.been.calledOnce
              .and.calledWith(fs.$e);
          });
        });

        describe('if reading file succeeds', function() {
          before(function() {
            fs.$c.readFile.success(fs);
            apiFn(new express(), config);
          });

          it('set a content-type specific header', function() {
            expect(express.$i.all.res.setHeader).to.have.been.calledOnce
              .and.calledWith('Content-type', 'application/json; charset=utf-8');
          });

          it('forward the read file buffer', function() {
            expect(express.$i.all.res.end).to.have.been.calledOnce
              .and.calledWith('readFileBuffer');
          });
        });
      });
    });
  });
});
