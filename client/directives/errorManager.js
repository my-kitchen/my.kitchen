angular.module('miam')
  .constant('errorMessages', {
    default: 'error.unexpectedError',
  })
  .service('errorManager', function(_, errorMessages, i18next) {
    this.error = null;
    this.setError = function(errorResponse) {
      i18next.then(function(t) {
        this.error = t(errorMessages[_.floor(errorResponse.status / 100) * 100] || errorMessages.default);
      }.bind(this));
      this.errorResponse = errorResponse;
    };

    this.unsetError = function() {
      this.error = null;
    };
  })
  .directive('errorManager', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/errorManager.html',
      controllerAs: 'error',
      controller: function(errorManager) {
        this.manager = errorManager;
      },
    };
  })
;
