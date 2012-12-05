#global module:false
exec = require('child_process').exec
path = require('path')

module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    clean: 
      test: ['tmp']
    
    compress:
      zip:
        files:
          "pub/msj_dsp_mod.zip":[
            "index.html"
            "js/**"
            "css/**"
            "更新履歴.txt"
          ]
          
  # Load
  grunt.loadNpmTasks "grunt-contrib"

  # grunt.registerTask 'default', 'lint qunit concat min'
  grunt.registerTask "default", "compress"

