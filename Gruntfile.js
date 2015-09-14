module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ],
        browserifyOptions: {
         debug: true
        }
      },
      client: {
        src: ['react_components/**/*.jsx', 'flux/**/*.js'],
        dest: 'public/build/app.built.js'
      }
    },

    watch: {
        react: {
          files: ['react_components/**/*.jsx', 'styles/*.styl', 'flux/**/*.js'],
          tasks: ['stylus', 'browserify']
        }
    },

    stylus: {
      compile: {
        files: {
          'public/build/styles.built.css': ['styles/*.styl'] // compile and concat into single file
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        jquery: true,
        node: true,
        globals: {
        
        }
      },

      files: {
        src: ['./*.js', './public/*.js', './public/app/**/*.js']
      }
    }
    
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task(s).
  grunt.registerTask('default', ['browserify']);

};