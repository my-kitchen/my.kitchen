'use strict';

angular.module('myKitchen', [
  'ui.router',
])
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/recipes/new');
  })
  .factory('_', function() {
    return window._;
  })
;
