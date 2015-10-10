var glou = require('glou');
var del = require('del');
var runSequence = require('run-sequence');
var gulp = require('gulp');
var ngTemplates = require('gulp-ng-templates');
var ngAnnotate = require('gulp-ng-annotate');
var nodemon = require('gulp-nodemon');

gulp.task('clean', function() {
  return del([
    'public/**/*',
    ]);
});

var copyCss = glou
.src({buffer: false}, [
  'client/css/*.css',
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/font-awesome/css/font-awesome.min.css'
  ])
.dest({log: false}, 'public/css')
;

var copyStatic = glou
.src({buffer: false}, ['client/static/**/*', '!client/js/app.js'])
.dest({log: false}, 'public/static')
;

var copyFonts = glou
.src({buffer: false}, [
  'node_modules/bootstrap/fonts/**/*',
  'node_modules/font-awesome/fonts/**/*'
  ])
.dest({log: false}, 'public/fonts')
;

var copyJs = glou
.src(['node_modules/angular/angular.min.js',
  'node_modules/angular-route/angular-route.min.js',
  'client/js/**/*.js',
  '!client/js/app.js',
  ])
.pipe(ngAnnotate)
.dest({log: false}, 'public/js')
;

var copyApp = glou
.src({buffer: false}, [
  'client/js/app.js',
  ])
.pipe(ngAnnotate)
.dest({log: false}, 'public/')
;

var copyIndex = glou
.src({buffer: false}, [
  'client/html/index.html',
  ])
.dest({log: false}, 'public/')
;

var templates = glou
.src(['client/html/**/*.html', '!client/html/index.html'])
.pipe(ngTemplates, {
  filename: 'templates.js',
  module: 'myKitchen'
})
.dest({log: false}, 'public/js')
;

var copy = glou.parallel(copyCss, copyStatic, copyFonts, copyJs, copyIndex, copyApp, templates);

glou.task('copy', copy);

gulp.task('clean', function() {
  return del([
    'public/**/*',
    ]);
});

gulp.task('build', function(done) {
  runSequence('clean', 'copy', done);
});
gulp.task('default', ['build']);
gulp.task('watch', ['build'], function() {
  glou.watch(['client/**/*'], 'copy');
})
gulp.task('serve', ['build', 'watch'], function() {
  nodemon({
    script: 'server/server.js',
    env: {
      NODE_ENV: 'development',
      NODE_PORT: 8000
    },
  });
}, []);
