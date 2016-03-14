'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var ngAnnotate = require('gulp-ng-annotate');
var ngTemplates = require('gulp-ng-templates');
var htmlmin = require('gulp-htmlmin');
var protractor = require('gulp-protractor').protractor;
var webdriverStandalone = require('gulp-protractor').webdriver_standalone;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

gulp.task('default', ['start']);

gulp.task('start', ['build'], function() {
  gulp.watch('client/**/*', ['codestyle', 'build-app']);
  return nodemon({
    script: 'index.js',
    ext: 'js',
  });
});

gulp.task('clean', function() {
  return del(['dist/**/*']);
});

gulp.task('build', function(cb) {
  runSequence('clean', ['build-lib', 'build-app'], cb);
});

gulp.task('build-lib', ['build-bootstrap'], function () {
  return gulp.src([
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-ui-bootstrap/dist/*',
      'node_modules/lodash/lodash.js',
    ])
    .pipe(gulp.dest('dist/lib/'))
  ;
});

gulp.task('build-bootstrap', function () {
  return gulp.src('node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('dist/lib/bootstrap/'))
  ;
});

gulp.task('build-app', ['templates', 'build-js', 'build-static']);

gulp.task('templates', function() {
  return gulp.src(['client/**/*.html', '!client/index.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(ngTemplates({
      filename: 'templates.js',
      module: 'myKitchen',
      standalone: false
    }))
    .pipe(gulp.dest('dist/'))
  })
;

gulp.task('build-js', ['codestyle'], function () {
  return gulp.src('client/**/!(*.spec).js')
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('codestyle', function() {
  return gulp.src(['client/**/*.js'])
    .pipe(jshint())
    .pipe(jscs())
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-static', function () {
  return gulp.src(['client/**/!(*.js|*.html)', 'client/index.html', 'client/style/**/*'])
    .pipe(gulp.dest('dist/'))
  ;
});

gulp.task('test', function() {
  return gulp.src(['client/**/*.spec.js', 'tests/**/*.js'], { read: false })
    .pipe(protractor({
      configFile: 'tests/protractor.config.js',
      args: ['--baseUrl', 'http://localhost:9000']
    }))
  ;
});

gulp.task('webdriverUpdate', webdriverUpdate);
gulp.task('webdriverStandalone', webdriverStandalone);
