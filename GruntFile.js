module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
       src: [
       './*.js',
       './settings/*.js',
       './services/**/*.js',
       './services/*.js',
       './lib/*.js',
       '*.js'
       ],
       options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: false,
        eqnull: false,
        asi : true,
        globals: { testUndefinedVariable: false, process: false, require: false, __dirname: false, console: false, module: false, exports: false }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-forever');
  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};