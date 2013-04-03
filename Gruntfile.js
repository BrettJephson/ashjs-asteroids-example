module.exports = function (grunt) {

    // project config
    grunt.initConfig({
        // get metadata from package
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: [
                'Gruntfile.js', 'build.js', 'build.min.js',
                'src/**/*.js'
            ],
            options: {
                browser: true,
                white: false
            }
        },

        // requirejs config
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
                    out: 'build/<%= pkg.name %>.min.js'
                }
            }
        },

        // connect server
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    keepalive: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');

    /*
    grunt.registerTask('all_checks', 'lint all_tests');
    grunt.registerTask('all_tests', 'server qunit');
    grunt.registerTask('compile', 'concat min');
    grunt.registerTask('require', 'requirejs');
    */
    grunt.registerTask('default', ['requirejs']);
};
