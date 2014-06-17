'use strict';

define(function($api, $clientHtml) {

  return function(app, config) {
    $api(app, config);
    $clientHtml(app, config);
  };
});
