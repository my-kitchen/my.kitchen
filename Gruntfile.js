'use strict';

module.exports = function(grunt) {

  // Project configuration
  var config = {
    env : {
      dev : {
        NODE_ENV: 'development',
      },
      test : {
        NODE_ENV: 'test',
      },
    },

    karma: {
      unit: {
        configFile: 'test/client/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true,
      },
      midway: {
        configFile: 'test/client/karma-midway.conf.js',
        autoWatch: false,
        singleRun: true,
      },
      e2e: {
        configFile: 'test/client/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true,
      },
    },

    mochaTest: {
      func: {
        src: 'test/server/func/**/*.js',
      },
      unit: {
        src: 'test/server/unit/**/*.js',
      },
    },

    watch: {
      jsclient: {
        files: 'client/js/**/*.js',
        tasks: ['jshint:jsclient', 'test:client'],
      },
      jsserver: {
        files: 'server/**/*.js',
        tasks: ['jshint:jsserver', 'test:server'],
      },
      grunt: {
        files: ['Gruntfile.js', 'package.json'],
        tasks: ['jshint:grunt'],
      },
      test: {
        files: 'test/**/*.js',
        tasks: ['jshint:test', 'test'],
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          nodeArgs: ['--debug'],
          watch: ['server'],
        },
      },  
    },

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

    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      watchAndServe: ['nodemon:dev', 'watch'],
    }
  };

  // Load modules
  grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.initConfig(config);

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

  grunt.registerTask('start', ['env:dev', 'concurrent:watchAndServe']);
  grunt.registerTask('test', function(name, reporter) {
    var tasks = [];
    var mocha = false;

    if (!name) {
      tasks = ['karma:e2e', 'karma:midway', 'karma:unit', 'mochaTest:unit', 'mochaTest:func'];
      mocha = true;
    } else {
      switch(name) {
      case 'e2e' :
        tasks = ['karma:e2e'];
        break;
      case 'midway' :
        tasks = ['karma:midway'];
        break;
      case 'kunit' :
        tasks = ['karma:unit'];
        break;
      case 'client' :
        tasks = ['karma:e2e', 'karma:midway', 'karma:unit'];
        break;
      case 'unit' :
        tasks = ['mochaTest:unit'];
        mocha = true;
        break;
      case 'func' :
        tasks = ['mochaTest:func'];
        mocha = true;
        break;
      case 'server' :
        tasks = ['mochaTest:unit', 'mochaTest:func'];
        mocha = true;
        break;
      default: grunt.error.fail('Unknown action ' + name);
      }
    }

    if (mocha && reporter) {
      grunt.config('mochaTest.options', {
        reporter: reporter,
      });
    }

    tasks.unshift('env:test');

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', 'start');
};
