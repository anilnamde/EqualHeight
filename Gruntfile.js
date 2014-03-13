module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            release: {
                options: {
                    compress: {
                        drop_console: true
                    },
                    mangle: {
                        except: ['jQuery']
                    }
                },
                files: {
                    'build/equal.min.js': ['js/equal.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};