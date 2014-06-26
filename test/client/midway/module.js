'use strict';

describe('Module', function() {
  describe('myKitchen', function() {

    var module;
    before(function() {
      module = angular.module('myKitchen');
    });

    it('is registered', function() {
      expect(module).not.to.equal(null);
    });

    describe('dependencies', function() {

      var deps;
      before(function() {
        deps = module.value('myKitchen').requires;
      });

      it('contains ngRoute', function() {
        expect(deps).to.contain('ngRoute');
      });

      it('contains recipeControllers', function() {
        expect(deps).to.contain('recipeControllers');
      });
    });
  });

  describe('recipeControllers', function() {

    var module;
    before(function() {
      module = angular.module('recipeControllers');
    });

    it('is registered', function() {
      expect(module).not.to.equal(null);
    });

    describe('dependencies', function() {

      var deps;
      before(function() {
        deps = module.value('recipeControllers').requires;
      });

      it('contains no dependency', function() {
        expect(deps).to.be.empty;
      });
    });
  });
});
