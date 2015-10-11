'use strict';

angular.module('myKitchen', [
  'ngRoute',
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/recipe', {
    templateUrl: 'home/recipe-list.html',
    controller: 'RecipeListController',
  })
  .when('/recipe/:recipeId', {
    templateUrl: 'recipeDetail/recipe-detail.html',
    controller: 'RecipeDetailController',
  })
  .otherwise({
    redirectTo: '/recipe',
  });
})
;
