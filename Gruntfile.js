module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),




    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: './server.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      files: ['**/*'],
      tasks: ['jshint'],
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};