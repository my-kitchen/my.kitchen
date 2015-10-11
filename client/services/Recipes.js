'use strict';

angular.module('myKitchen')
  .constant('apiUrl', 'http://localhost:3000/')
  .factory('recipes', function($http, $q, apiUrl) {
    var recipeUrl;
    $http.get(apiUrl).then(function(index) {
      recipeUrl = index.recipe;
    });

    return {
    	query: function() {
        if(!recipeUrl) {
          return $q.reject('Recipe not yet initialized');
        }
    		return $http.get(recipeUrl).then(function(data) {
          return data.data;
        });
    	},
      get: function(id) {
        if(!recipeUrl) {
          return $q.reject('Recipe not yet initialized');
        }
        return $http.get(recipeUrl + id).then(function(data) {
          return data.data;
        });
      },
    };
  })
;
