module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        lint: {
            files: ['src/**/*.js']
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                indent: 4,
                camelcase: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: true,
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                maxparams: 3,
                maxdepth: 2,
                maxstatements: 5,
                maxcomplexity: 5,
                maxlen: 180,
                devel: true,
                browser: true
            }
        },
        qunit: {
            //all: ['test/test_runner.html']
        },
        server: {
            port: 8000,
            base: '.'
        },
        watch: {
            tests: {
                files: '<config:lint.files>',
                tasks: 'all_checks'
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
                        'libs/ash': 'lib/ash/ash.require',
                        'asteroids-app': 'src/asteroids-app',
                        'game': 'src/game',
                        'brejep': 'lib/brejep',
                        'almond': 'lib/vendor/almond',
                        'libs/signals': 'lib/vendor/signals.min'
                    },
                    out: 'build/ashteroids.min.js'
                }
            }
        }
    });

    grunt.registerTask('all_checks', 'lint all_tests');
    grunt.registerTask('all_tests', 'server qunit');
    grunt.registerTask('compile', 'concat min');
    grunt.registerTask('require', 'requirejs');
    grunt.registerTask('default', 'all_checks');

    grunt.loadNpmTasks('grunt-requirejs');
};