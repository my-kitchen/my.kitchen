angular.module('miam')
  .service('ingredients', function($http, Ingredient) {
    this.rootUrl = null;
    urls.getUrl('ingredients').then(function(rootUrl) {
      this.rootUrl = rootUrl;
    });

    this.search = function(value) {
      return urls.getUrl(this.rootUrl, 'search').then(function(url) {
        return $http.put(url, {
          terms: value,
        });
      });
    };

    this.get = function() {
      return $http.get(this.rootUrl).then(function(ingredient) {
        return new Ingredient(ingredient);
      });
    };
  })
;
