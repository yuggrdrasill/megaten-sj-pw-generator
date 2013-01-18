#global module:false
exec = require('child_process').exec
path = require('path')

module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    shell:
      hogan:
        command: 'hulk ./templates/*.mustaches > ./templates/templates.js'
        stdout: true

    compress:
      zip:
        files:
          "pub/msj_dsp_mod.zip":[
            "index.html"
            "js/**"
            "css/**"
            "templates/**"
            "更新履歴.txt"
          ]

  # Load
  grunt.loadNpmTasks "grunt-contrib"
  grunt.loadNpmTasks "grunt-shell"

  # grunt.registerTask 'default', 'lint qunit concat min'
  grunt.registerTask "default", "shell compress"

