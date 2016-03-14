angular.module('myKitchen')
  .config(function($stateProvider) {
    $stateProvider.state('newRecipe', {
      url: '/recipes/new',
      templateUrl: 'newRecipe/newRecipe.html',
    });
  })
  .controller('NewRecipeController', function($state, breadcrumbs, recipes, ingredients, units) {
    breadcrumbs.push('newRecipe');
    recipes.getCurrent().then(function(res) {
      this.recipe = res;
    }.bind(this));
    units.findAll().then(function(res) {
      this.units = res;
    }.bind(this))

    this.searchIngredient = function(input) {
      return ingredients.search(input);
    };

    this.chooseIngredient = function(ingredient) {
      return ingredients.get(ingredient.id).then(function() {
        this.recipe.posologies.push({
          ingredient: ingredient,
          quantity: ingredient.baseQuantity,
          unit: ingredient.units[0],
          qualifier: ingredient.qualifiers.length && ingredient.qualifiers[0],
        });
      }.bind(this));
    };

    this.createNewIngredient = function() {
      $state.goTo('newIngredient');
    };

    this.deletePosology = function(index) {
      delete this.recipe.posologies[index];
    };
  })
;
