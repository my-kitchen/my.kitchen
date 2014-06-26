'use strict';

describe('Route', function() {

  var $tester;
  var $route;
  beforeEach(function() {
    $tester = ngMidwayTester('myKitchen');
    $route = $tester.inject('$route');
  });

  afterEach(function() {
    $tester.destroy();
    $tester = null;
    $route = null;
  });

  describe('/recipe', function() {
    it('exist', function(done) {
      $tester.visit('/recipe', function() {
        expect($tester.path()).to.equal('/recipe');
        done();
      });
    });

    it('access to RecipeListCtrl - templates/recipe-list.html', function(done) {
      $tester.visit('/recipe', function() {
        expect($route.current.controller).to.equal('RecipeListCtrl');
        expect($route.current.templateUrl).to.equal('templates/recipe-list.html');
        done();
      });
    });

    it('is navigable via /recipe/', function(done) {
      $tester.visit('/recipe/', function() {
        expect($tester.path()).to.equal('/recipe');
        done();
      });
    });
  });

  describe('/recipe/:recipeId', function() {
    it('exist', function(done) {
      $tester.visit('/recipe/:recipeId', function() {
        expect($tester.path()).to.equal('/recipe/:recipeId');
        done();
      });
    });

    it('access to RecipeDetailCtrl - templates/recipe-detail.html', function(done) {
      $tester.visit('/recipe/:recipeId', function() {
        expect($route.current.controller).to.equal('RecipeDetailCtrl');
        expect($route.current.templateUrl).to.equal('templates/recipe-detail.html');
        done();
      });
    });

    it('has a required recipeId parameter', function(done) {
      $tester.visit('/recipe/:recipeId', function() {
        expect($route.current.params).to.have.property('recipeId', ':recipeId');
        done();
      });
    });

    it('is navigable via /recipe/:recipeId/', function(done) {
      $tester.visit('/recipe/:recipeId/', function() {
        expect($tester.path()).to.equal('/recipe/:recipeId');
        done();
      });
    });
  });

  it('default route exist and redirect to /recipe', function(done) {
    $tester.visit('/', function() {
      expect($tester.path()).to.equal('/recipe');
      done();
    });
  });
});
