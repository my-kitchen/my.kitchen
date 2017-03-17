angular.module('miam')
  .provider('i18next', function() {
    var i18next = window.i18next;
    var init = [{
      backend: {
        loadPath: 'locales/{{lng}}.json'
      },
    }];

    this.init = function(options) {
      init.push(options);
    };
    this.$get = function(_, $q) {
      var deferred = $q.defer();

      i18next.use(window.i18nextXHRBackend);
      i18next.init(_.merge.apply(_, init), function(err, res) {
        if (err) {
          return deferred.reject(err);
        }
        deferred.resolve(res);
      });
      return deferred.promise;
    };
  })
  .config(function(i18nextProvider) {
    i18nextProvider.init({
      lng: 'fr',
      debug: true,
    });
  })
  .run(function($rootScope, i18next) {
    i18next.then(function(t) {
      $rootScope.t = t;
    });
  })
;
