'use strict';

angular.module('myKitchen')
  .provider('apiDictionary', function() {
    var baseUrl;
    var dictionary = {
      _loaded: false,
    };

    this.configure = function(apiUrl) {
      baseUrl = apiUrl;
    };

    this.$get = function($http) {
      if (!dictionary._loaded && !dictionary._init) {
        dictionary._init = $http.get(baseUrl).then(function(index) {
          angular.extend(dictionary, index.data, {_loaded: true});
        });
      }
      return dictionary;
    };
  })
  .config(function(apiDictionaryProvider) {
    apiDictionaryProvider.configure('http://localhost:3000/');
  })
  .run(function($rootScope, $http, apiDictionary) {
    apiDictionary._init.then(function() {
      $rootScope.$emit('api.dictionary.loaded');
    });
  })
  .factory('recipes', function($http, $q, $rootScope, apiDictionary) {
    var delayedFunction = function(functionToCall) {
      return function() {
        var args = Array.prototype.slice.call(arguments, 1);
        if (apiDictionary._loaded) {
          return functionToCall.apply(this, args);
        }

        var deferred = $q.defer();
        $rootScope.$on('api.dictionary.loaded', function() {
          deferred.resolve(functionToCall.apply(this, args));
        }.bind(this));
        return deferred.promise;
      };
    };

    var recipes = {
      query: delayedFunction(function() {
        return $http.get(apiDictionary.recipe).then(function(data) {
          return data.data;
        });
      }),
      get: delayedFunction(function(id) {
        return $http.get(apiDictionary.recipe + id).then(function(data) {
          return data.data;
        });
      }),
    };

    return recipes;
  })
;
