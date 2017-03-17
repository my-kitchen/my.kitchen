angular.module('miam')
  .service('urls', function($http, $q) {
    this.summary = null;
    this.$load = $http.get('/api').then(function(summary) {
      this.summary = summary;
    }.bind(this));

    this.getUrl = function(url) {
      return $q.when(this.summary || this.$load).then(function(summary) {
        return summary[url];
      });
    };
  })
;
