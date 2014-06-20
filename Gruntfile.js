'use strict';

module.exports = function(grunt) {

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
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: 'public',
        },
      },
    },

    // declare environments
    env : {
      dev : {
        NODE_ENV: 'development',
      },
      test : {
        NODE_ENV: 'test',
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
        keepAlive: true,
        noColor: false,
      },
      e2e: {
        options: {
          configFile: './test/client/protractor-e2e.conf.js',
        },
      },
    },

    // for server tests
    mochaTest: {
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
        files: 'client/js/**/*.js',
        tasks: ['jshint:jsclient', 'test:client'],
      },
      jsserver: {
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
      },
      test: {
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
    }
  };

  // Load modules
  grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.initConfig(config);

  // if changing file, launch the right tools on this file only if possible
  grunt.event.on('watch', function(action, filepath) {
    if (filepath.match('^server/')) {
      grunt.config('jshint.jsserver.src', filepath);
    }
    else if (filepath.match('^client/')) {
      grunt.config('jshint.jsclient.src', filepath);
    }
    else if (filepath.match('^test/server')) {
      grunt.config('jshint.test.src', filepath);
      var tasks = grunt.config('watch.test.tasks');
      if (filepath.match('^test/server')) {
        grunt.config('mochaTest.func.src', filepath);
        grunt.config('mochaTest.unit.src', filepath);
        tasks[1] = 'test:server';
      } else {
        tasks[1] = 'test:client';
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
    case 'e2e' :
      tasks = grunt.task.run(['build', 'connect:server', 'protractor:e2e']);
      return;
    case 'client' :
      grunt.task.run('test:e2e');
      return;
    case 'unit' :
      tasks.push('mochaTest:unit');
      break;
    case 'func' :
      tasks.push('mochaTest:func');
      break;
    case 'server' :
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
