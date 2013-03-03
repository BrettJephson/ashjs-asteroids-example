module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: [ 'Gruntfile.js', 'src/**/*.js' ],
            options: {
                browser: true,
                white: false
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '',
                    name: 'build/asteroids-build',
                    optimize: 'uglify',
                    findNestedDependencies: true,
                    paths: {
                        'brejep': 'lib/brejep',
                        'libs/signals': 'lib/vendor/signals.min',
                        'almond': 'lib/vendor/almond',
                        'game' : 'src/game'
                    },
                    out: 'build/asteroids-game.js'
                }
            }
        }
    });
    
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint', 'requirejs']);

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
};