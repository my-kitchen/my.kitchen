'use strict';

var recipeControllers = angular.module('recipeControllers', []);

recipeControllers.controller('RecipeListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('api/recipe').success(function(data) {
      $scope.recipes = data.splice(0, 5);
    });

    $scope.orderProp = 'age';
  }
]);

recipeControllers.controller('RecipeDetailCtrl', [
  '$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('api/recipe/' + $routeParams.recipeId).success(function(data) {
      $scope.recipe = data;
    });
  }]
);
