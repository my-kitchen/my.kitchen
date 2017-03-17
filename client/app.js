'use strict';

angular.module('miam', [
  'ui.router',
  'ui.bootstrap',
  'angularSpinner',
  'angular-uuid',
  'ngAria',
  'ngAnimate',
  'ngMessages',
  'ngMaterial',
])
  .factory('_', function() {
    return window._;
  })
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/ingredients/new');
  })
  .config(function($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red')
    ;
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push(function($q, errorManager, _) {
      return {
        responseError: function(response) {
          errorManager.setError(response);
          return $q.reject(response);
        },
      };
    });
  })
;
