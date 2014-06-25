'use strict';

var myKitchen = angular.module('myKitchen', [
  'ngRoute',
  'recipeControllers',
]);

myKitchen.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/recipe', {
        templateUrl: 'templates/recipe-list.html',
        controller: 'RecipeListCtrl',
      })
      .when('/recipe/:recipeId', {
        templateUrl: 'templates/recipe-detail.html',
        controller: 'RecipeDetailCtrl',
      })
      .otherwise({
        redirectTo: '/recipe',
      });
  }]);
