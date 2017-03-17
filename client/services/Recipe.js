angular.module('miam')
  .factory('Recipe', function(_) {
    var Recipe = function(base) {
      this.posologies = [];
      _.merge(this, base);
    };

    return Recipe;
  })
;
