'use strict';

angular.module('myKitchen')
  .controller('RecipeDetailController', function($routeParams, recipes) {
    recipes.get($routeParams.recipeId).then(function(recipe) {
    	this.recipe = recipe;
    }.bind(this));
  })
;
