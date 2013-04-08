module.exports = function (grunt) {

    // project config
    grunt.initConfig({
        // get metadata from package
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: [
                'Gruntfile.js', 'build.js',
                'src/**/*.js', 'lib/brejep/*.js'
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
                    mainConfigFile: "build.js"
                }
            },
            minified: {
                options: {
                    mainConfigFile: "build.min.js"
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

    grunt.registerTask('default', ['jshint', 'requirejs']);
};
