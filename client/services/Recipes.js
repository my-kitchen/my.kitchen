angular.module('miam')
  .service('recipes', function($q, Recipe) {
    var currentRecipe = new Recipe();

    this.getCurrent = function() {
      var deferred = $q.defer();

      deferred.resolve(currentRecipe);

      return deferred.promise;
    };
  })
;
