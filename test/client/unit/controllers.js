'use strict';

describe('MyKitchen controllers', function() {

  beforeEach(module('myKitchen'));

  describe('RecipeListCtrl', function() {
    var scope;
    var ctrl;
    var $httpBackend;
    var recipes = [{name: 'Tarte aux pommes'}, {name: 'Mousse au chocolat'}];

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('api/recipe')
        .respond(recipes);

        scope = $rootScope.$new();
        ctrl = $controller('RecipeListCtrl', { $scope: scope });
    }));

    it('create "recipes" model with 2 recipes received from API', inject(function($controller) {
      expect(scope.recipes).to.be.undefined;
      $httpBackend.flush();

      expect(scope.recipes).to.deep.equal(recipes);
    }));

    it('set the default value of orderProp model', inject(function($controller) {
      expect(scope.orderProp).to.equal('age');
    }));
  });

  describe('RecipeDetailCtrl', function() {
    var scope;
    var $httpBackend;
    var ctrl;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('api/recipe/xyz').respond({ name: 'recipe xyz' });

      $routeParams.recipeId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('RecipeDetailCtrl', { $scope: scope });
    }));


    it('should fetch recipe detail', function() {
      expect(scope.recipe).to.be.undefined;
      $httpBackend.flush();

      expect(scope.recipe).to.deep.equal({ name: 'recipe xyz' });
    });
  });
});
