angular.module('myKitchen')
  .service('ingredients', function($q, $timeout) {
    this.search = function() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve([
          {name: 'Chocolat', id: 'http://localhost:9000/ingredients/chocolat'},
        ]);
      });

      return deferred.promise;
    };

    this.get = function() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve({
          name: 'Chocolat',
          id: 'http://localhost:9000/ingredients/chocolat',
          baseQuantity: 100,
          units: ['http://localhost:9000/units/g'],
          qualifiers: [],
        });
      });

      return deferred.promise;
    };
  })
;
