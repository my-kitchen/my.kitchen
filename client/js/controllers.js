'use strict';

var myKitchen = angular.module('myKitchen', []);

myKitchen.controller('RecipeListCtrl', function($scope, $http) {
  $http.get('api/recipe').success(function(data) {
    $scope.recipes = data;
  });

  $scope.orderProp = 'age';
});
