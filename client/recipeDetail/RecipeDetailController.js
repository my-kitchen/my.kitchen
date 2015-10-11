'use strict';

angular.module('myKitchen')
  .controller('RecipeDetailController', function($routeParams, Recipes) {
    Recipes.get($routeParams.recipeId).then(function(recipe) {
    	console.log(recipe, $routeParams.recipeId)
    	this.recipe = recipe;
    }.bind(this));
  })
;
