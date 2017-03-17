angular.module('miam')
  .factory('Ingredient', function(urls, _, uuid) {
    var Ingredient = function(params) {
      _.assign(this, Ingredient.defaults, params);
      urls.getUrl('ingredients').then(function() {
        this.id = this.id || ingredients.rootUrl + '/' + uuid.v4();
      }.bind(this));
    };

    Ingredient.defaults = {
      name: null,
      image: null,
      baseQuantity: 1,
      units: [],
      qualifiers: [],
    };

    return Ingredient;
  })
;
