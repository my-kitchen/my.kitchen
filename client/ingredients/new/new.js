angular.module('miam')
  .config(function($stateProvider) {
    $stateProvider.state('newIngredient', {
      url: '/ingredients/new',
      templateUrl: 'ingredients/new/new.html',
    });
  })
  .controller('NewIngredientController', function(Ingredient) {
    this.ingredient = new Ingredient();

    this.save = function() {

    };
  })
;
