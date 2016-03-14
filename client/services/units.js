angular.module('myKitchen')
  .service('units', function($q, $timeout) {
    this.findAll = function() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve([
          {name: 'gramme', plural: 'grammes', symbol: 'g', id: 'http://localhost:9000/units/g'},
          {name: 'once', plural: 'onces', symbol: 'oz', id: 'http://localhost:9000/units/oz'},
        ]);
      });

      return deferred.promise;
    };
  })
;
