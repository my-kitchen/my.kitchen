'use strict';

angular.module('myKitchen', [
  'ngRoute',
  'recipeControllers',
  ])
.config(function($routeProvider) {
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
})
;
