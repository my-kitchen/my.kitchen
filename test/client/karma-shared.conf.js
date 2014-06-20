'use strict';

module.exports = function() {
  return {
    basePath: '../../',
    frameworks: ['mocha'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    
    files : [
      // 3rd Party Code
      './bower_components/angular/angular.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',

      // App-specific Code
      './client/**/*.js',

      // Test-Specific Code
      './node_modules/chai/chai.js',
      //'test/lib/chai-expect.js'
    ],
  };
};
