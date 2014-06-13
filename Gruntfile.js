'use strict';

module.exports = function(grunt) {

  // Project configuration
  var config = {
    karma: {
      unit: {
        configFile: './test/client/karma-unit.conf.js',
        autoWatch: false,
        singleRun: true,
      },
      midway: {
        configFile: './test/client/karma-midway.conf.js',
        autoWatch: false,
        singleRun: true,
      },
      e2e: {
        configFile: './test/client/karma-e2e.conf.js',
        autoWatch: false,
        singleRun: true,
      },
    },

    watch: {
      jsclient: {
        files: 'client/js/**/*.js',
        tasks: 'jshint:client',
      },
      jsserver: {
        files: 'server/**/*.js',
        tasks: 'jshint:server',
      },
      livereload: {
        files: 'public/**/*',
        options: {
          livereload: true,
        },
      },
      grunt: {
        files: ['Gruntfile.js', 'package.json'],
        tasks: ['dev'],
      },
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
      client: {
        src: 'client/js/**/*.js',
        options: {
          jshintrc: 'client/js/.jshintrc',
        },
      },
      server: {
        src: ['Gruntfile.js', 'server/**/*.js'],
        options: {
          jshintrc: 'server/.jshintrc',
        },
      },
      test: {
        src: ['test/**/*.js'],
        options: {
          jshintrc: 'test/.jshintrc',
        },
      },
    },

    concurrent: {
      options: {
        logConcurrentOutput: true,
      },
      run: ['nodemon:dev', 'watch'],
    }
  };

  // Load modules
  grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.initConfig(config);

  grunt.event.on('watch', function(action, filepath) {
    if (filepath.match('server/')) {
      grunt.config('jshint.server.src', filepath);
    }
    else {
      grunt.config('jshint.client.src', filepath);
    }
  });

  grunt.registerTask('start', 'concurrent:run');

  // Default task
  grunt.registerTask('default', 'start');
};
