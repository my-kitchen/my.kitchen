'use strict';

module.exports = function() {
  return {
    basePath: '../../',
    frameworks: ['mocha'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: false,

    // these are default values anyway
    singleRun: false,
    colors: true,
    
    files : [
      // 3rd Party Code
      'bower_components/angular/angular.js',
      //'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      //'bower_components/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      //'bower_components/angular-ui-router/release/angular-ui-router.js',
      //'bower_components/angular-ui-utils/modules/route/route.js'
      //'bower_components/angular-route/angular-route.js',
      //'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',
      //'app/scripts/lib/router.js',

      //App-specific Code
      'client/**/*.js',
      //'app/scripts/config/config.js',
      //'app/scripts/services/**/*.js',
      //'app/scripts/directives/**/*.js',
      //'app/scripts/controllers/**/*.js',
      //'app/scripts/filters/**/*.js',
      //'app/scripts/config/routes.js',
      //'app/scripts/app.js',

      //Test-Specific Code
      'node_modules/chai/chai.js',
      //'test/lib/chai-expect.js'
    ],
  };
};
