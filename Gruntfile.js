'use strict';

module.exports = function(grunt) {

  var _ = require('lodash');
  var pkg = grunt.file.readJSON('package.json');

  // Project configuration
  var config = {
    pkg: pkg,

    // clean all files in public
    clean: {
      all: ['public/<%= pkg.version %>/'],
    },

    // jade compilation
    jade: {
      options: {
        pretty: true,
        compileDebug: false,
        doctype: 'html',
        data: {
          pkg: pkg,
        },
      },

      compile: {
        files: [{
          expand: true,
          cwd: 'client/html',
          src: '*.jade',
          dest: 'public',
          ext: '.html',
        }, {
          expand: true,
          cwd: 'client/html/template',
          src: '**/*.jade',
          dest: 'public/<%= pkg.version %>/templates',
          ext: '.html',
        }],
      },
    },

    // css minification and compilation
    stylus: {
      dev: {
        options: {
          compress: false,
        },
        files: {
          'public/<%= pkg.version %>/css/app.css': ['client/css/*.css'],
        },
      },
    },

    // for e2e tests: open a front server
    express: {
      test: {
        options: {
          script: 'server/server.js',
          port: 9000,
          node_env: 'test',
        },
      },
    },

    // declare environments
    env : {
      dev : {
        NODE_ENV: 'development',
        NODE_PORT: 8000,
      },
      test : {
        NODE_ENV: 'test',
        NODE_PORT: 9000,
      },
    },

    // image minification
    imagemin: {
      png: {
        options: {
          pngquant: true,
          optimizationLevel: 7,
        },
        files: [{
          expand: true,
          cwd: 'client/img/',
          src: '**/*.png',
          dest: 'public/<%= pkg.version %>/img/',
        }],
      },
      jpg: {
        options: {
          progressive: true,
        },
        files: [{
          expand: true,
          cwd: 'client/img/',
          src: '**/*.jpg',
          dest: 'public/<%= pkg.version %>/img/',
        }],
      },
    },

    // copy files to public during build phase
    copy: {
      static: {
        files: [{
          expand: true,
          cwd: 'client/static',
          src: '**/*',
          dest: 'public',
        }],
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'bower_components/font-awesome/fonts/',
          src: '**/*',
          dest: 'public/<%= pkg.version %>/fonts/',
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/fonts/',
          src: '**/*',
          dest: 'public/<%= pkg.version %>/fonts/',
        }],
      },
    },

    // e2e test module
    protractor: {
      options: {
        configFile: './node_modules/protractor/referenceConf.js',
        keepAlive: false,
        noColor: false,
      },
      e2e: {
        options: {
          configFile: './test/client/protractor-e2e.conf.js',
        },
      },
    },

    // client unit test module
    karma: {
      kunit: {
        configFile: './test/client/karma-unit.conf.js',
      },
      midway: {
        configFile: './test/client/karma-midway.conf.js',
      },
    },

    // for server tests
    mochaTest: {
      options: {
        clearRequireCache: true,
      },
      func: {
        src: 'test/server/func/**/*.js',
      },
      unit: {
        src: 'test/server/unit/**/*.js',
      },
    },

    // for dev: watch changing files
    watch: {
      jade: {
        files: 'client/html/**/*.jade',
        tasks: ['jade', 'ngtemplates', 'usemin2'],
      },
      jsclient: {
        options: {
          spawn: false,
        },
        files: 'client/js/**/*.js',
        tasks: ['jshint:jsclient', 'test:client'],
      },
      jsserver: {
        options: {
          spawn: false,
        },
        files: 'server/**/*.js',
        tasks: ['jshint:jsserver', 'test:server'],
      },
      img: {
        files: 'client/img/**/*',
        tasks: ['imagemin'],
      },
      livereload: {
        files: 'public/**/*',
        options: {
          livereload: true,
        },
      },
      grunt: {
        files: ['Gruntfile.js', 'package.json'],
        tasks: ['jshint:grunt'],
        options: {
          reload: true,
        },
      },
      test: {
        options: {
          spawn: false,
        },
        files: 'test/**/*.js',
        tasks: ['jshint:test', 'test'],
      },
    },

    // start a nodejs server
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          nodeArgs: ['--debug'],
          watch: ['server'],
        },
      },
    },

    // check js code style
    jshint: {
      options: {
        jshintrc: 'server/.jshintrc',
      },
      jsclient: {
        src: 'client/js/**/*.js',
        options: {
          jshintrc: 'client/js/.jshintrc',
        },
      },
      jsserver: {
        src: 'server/**/*.js',
      },
      grunt: {
        src: 'Gruntfile.js',
      },
      test: {
        src: 'test/**/*.js',
        options: {
          jshintrc: 'test/.jshintrc',
        },
      },
    },

    // register angular templates
    ngtemplates: {
      app: {
        cwd: 'public/',
        src: ['<%= pkg.version %>/templates/**/*.html'],
        dest: 'public/<%= pkg.version %>/templates.js',
        options: {
          //module: 'my.kitchen',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          },
        },
      },
    },

    // minify css and js
    usemin2: {
      html: 'public/*.html',
      options: {
        baseDir: 'public',
        jsmin: ['ngmin', 'uglify'],
      },
      css: {
        dep: {
          dest: 'public/<%= pkg.version %>/css/dep.min.css',
          files: [{
            cwd: 'bower_components/bootstrap/dist/css/',
            src: 'bootstrap__min__.css',
            dest: 'public/<%= pkg.version %>/css/',
          }, {
            cwd: 'bower_components/font-awesome/css/',
            src: 'font-awesome__min__.css',
            dest: 'public/<%= pkg.version %>/css/',
          }],
        },
        app: {
          dest: 'public/<%= pkg.version %>/css/app.min.css',
          files: [{
            cwd: 'public/<%= pkg.version %>/css/',
            src: 'app.css',
          }],
        },
      },
      js: {
        head: {
          dest: 'public/<%= pkg.version %>/js/libs.min.js',
          files: [{
            cwd: 'bower_components/angular/',
            src: 'angular__min__.js',
            dest: 'public/<%= pkg.version %>/js/libs/',
          }, {
            cwd: 'bower_components/angular-bootstrap/',
            src: 'ui-bootstrap-tpls__min__.js',
            dest: 'public/<%= pkg.version %>/js/libs/',
          }],
        },
        body: {
          dest: 'public/<%= pkg.version %>/js/body.min.js',
          files: [{
            cwd: 'client/js',
            src: ['*.js', '*/*.js', '*/*/**/*.js'],
            dest: 'public/<%= pkg.version %>/js/',
          }, {
            cwd: 'public/<%= pkg.version %>/',
            src: ['templates.js'],
            dest: 'public/<%= pkg.version %>/',
          }],
        },
      },
    },

    // async launch grunt tasks
    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      build: [
        'jade',
        'stylus',
        'copy',
        'imagemin',
      ],
      watchAndServe: ['nodemon:dev', 'watch'],
    },
  };

  // Load modules
  grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.initConfig(config);

  // if changing file, launch the right tools on this file only if possible
  grunt.event.on('watch', function(action, filepath) {
    if (filepath.match('^server/')) {
      grunt.config('jshint.jsserver.src', filepath);
      return;
    }

    if (filepath.match('^client/')) {
      grunt.config('jshint.jsclient.src', filepath);
      return;
    }

    if (filepath.match('^test/')) {
      grunt.config('jshint.test.src', filepath);

      var tasks = grunt.config('watch.test.tasks');
      if (filepath.match('^test/server')) {
        if (filepath.match('^test/server/func')) {
          grunt.config('mochaTest.func.src', filepath);
          tasks[1] = 'test:func';
        }
        else {
          grunt.config('mochaTest.unit.src', filepath);
          tasks[1] = 'test:unit';
        }
      }
      else {
        if (filepath.match('^test/client/e2e')) {
          tasks[1] = 'test:e2e';
          grunt.config('test.watchedE2E', true);
        }
        else if (filepath.match('^test/client/midway')) {
          tasks[1] = 'test:midway';
        }
        else {
          tasks[1] = 'test:kunit';
        }
      }
      grunt.config('watch.test.tasks', tasks);
    }
  });

  grunt.registerTask('build', ['clean:all', 'concurrent:build', 'ngtemplates', 'usemin2']);
  grunt.registerTask('start', ['build', 'env:dev', 'concurrent:watchAndServe']);
  grunt.registerTask('test', function(name, reporter) {
    var tasks = ['env:test'];

    if (!name) {
      grunt.task.run(['test:client', 'test:server']);
      return;
    }

    switch(name) {
    case 'e2e':
      if (!grunt.config('test.watchedE2E')) {
        tasks.push('build');
      }
      else {
        grunt.config('test.watchedE2E', false);
      }

      tasks.push('express:test');
      tasks.push('protractor:e2e');
      tasks.push('express:test:stop');
      grunt.task.run(tasks);
      return;
    case 'midway':
      tasks.push('karma:midway');
      grunt.task.run(tasks);
      return;
    case 'kunit':
      tasks.push('karma:unit');
      grunt.task.run(tasks);
      return;
    case 'client':
      grunt.task.run(['test:e2e', 'test:midway', 'test:kunit']);
      return;
    case 'unit':
      tasks.push('mochaTest:unit');
      break;
    case 'func':
      tasks.push('mochaTest:func');
      break;
    case 'server':
      grunt.task.run(['test:unit', 'test:func']);
      return;
    default: grunt.error.fail('Unknown action ' + name);
    }

    if (reporter) {
      grunt.config('mochaTest.options', {
        reporter: reporter,
      });
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', 'start');
};
