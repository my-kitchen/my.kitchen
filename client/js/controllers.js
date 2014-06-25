'use strict';

var recipeControllers = angular.module('recipeControllers', []);

recipeControllers.controller('RecipeListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('api/recipe').success(function(data) {
      $scope.recipes = data.splice(0, 5);
    });

    $scope.orderProp = 'age';
  }]);

recipeControllers.controller('RecipeDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.recipeId = $routeParams.recipeId;
  }]);
