'use strict';

module.exports = function(grunt) {

  // Project configuration
  var config = {
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: 'client/html',
        },
      },
    },

    env : {
      dev : {
        NODE_ENV: 'development',
      },
      test : {
        NODE_ENV: 'test',
      },
    },

    protractor: {
      options: {
        configFile: './node_modules/protractor/referenceConf.js',
        keepAlive: true,
        noColor: false,
      },
      e2e: {
        options: {
          configFile: './test/client/protractor-e2e.conf.js',
        }
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

    if (!name) {
      grunt.task.run(['test:client', 'test:server']);
      return;
    }

    switch(name) {
    case 'e2e' :
      tasks = grunt.task.run(['connect:server', 'protractor:e2e']);
      return;
    case 'client' :
      grunt.task.run('test:e2e');
      return;
    case 'unit' :
      tasks = ['mochaTest:unit'];
      break;
    case 'func' :
      tasks = ['mochaTest:func'];
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

    tasks.unshift('env:test');

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', 'start');
};
