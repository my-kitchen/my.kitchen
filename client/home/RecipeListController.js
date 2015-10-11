'use strict';

angular.module('myKitchen')
  .controller('RecipeListController', function(Recipes) {
    Recipes.query().then(function(recipes) {
      this.recipes = recipes;
    }.bind(this));

    this.orderProp = 'age';
  })
;
