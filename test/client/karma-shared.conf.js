'use strict';

module.exports = function() {
  return {
    basePath: '../../',
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['progress'],
    browsers: ['Chrome'],
    autoWatch: false,
    singleRun: true,
    
    files : [
      // 3rd Party Code
      './bower_components/angular/angular.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      './test/client/mocha.conf.js',

      // App-specific Code
      './client/**/*.js',
    ],
  };
};
