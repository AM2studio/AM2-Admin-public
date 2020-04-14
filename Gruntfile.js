module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		/*************************************/
		/***** PACKAGE ***********************/
		/*************************************/

		pkg: grunt.file.readJSON('package.json'),

		/*************************************/
		/***** WATCHERS **********************/
		/*************************************/

		watch: {
			scss: {
				files: [
					'static/scss/**/*.scss'
				],
				tasks: ['sass:styleCSS']
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'html/admin/assets/css/*.css',
						'html/admin/assets/js/*.js',
						'html/admin/*.html'
					]
				},
				options: {
					watchTask: false
				}
			}
		},

		/*************************************/
		/***** JAVASCRIPT ********************/
		/*************************************/

		concat: {
			options: {
				separator: ''
			},
			adminPluginsJS: {
				src: [					
					'html/admin/assets/js/vendor/jquery.js',
					'html/admin/assets/js/vendor/moment.js',
					//'html/admin/assets/js/vendor/modernizr.js',
					'html/admin/assets/js/vendor/select2.full.min.js',
					'html/admin/assets/js/vendor/tooltipster.js',
					'html/admin/assets/js/vendor/fancybox.js',
					'html/admin/assets/js/vendor/stacktable.js',
					'html/admin/assets/js/vendor/pikaday.js',
					'html/admin/assets/js/vendor/pikaday.jquery.js',
					'html/admin/assets/js/vendor/jquery-clockpicker.js',
					'html/admin/assets/js/vendor/pnotify.custom.min.js',
					'html/admin/assets/js/vendor/jquery.repeater.min.js',
					'html/admin/assets/js/vendor/remodal.min.js',
					'html/admin/assets/js/vendor/dropzone.js',
					'html/admin/assets/js/vendor/sweetalert.min.js',
					'html/admin/assets/js/vendor/jquery.maskedinput.js',
					'html/admin/assets/js/vendor/jquery.validate.min.js'
				],
				dest: 'html/admin/assets/js/plugins.js'
			}
		},

		uglify: {
			options: {
				sourceMap: false
			},
			adminPluginsJS: {
				files: {
					'html/admin/assets/js/plugins.js': ['html/admin/assets/js/plugins.js']
				}
			}
		},

		/*************************************/
		/***** CSS ***************************/
		/*************************************/

		cmq: {
			options: {
				log: false
			},
			distCSS: {
				files: {
					'html/admin/assets/css/style.css':['html/admin/assets/css/style.css']
				}
			}
		},

		cssmin: {
			styleCSS: {
				src: 'html/admin/assets/css/style.css',
				dest: 'html/admin/assets/css/style.css'
			}
		}

	});

	/*************************************/
	/***** PLUGINS ***********************/
	/*************************************/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-devtools');
	grunt.loadNpmTasks('grunt-contrib-imagemin');


	/*************************************/
	/***** TASKS *************************/
	/*************************************/
	grunt.registerTask('JS_plugins', ['concat:adminPluginsJS', 'uglify:adminPluginsJS']);
	grunt.registerTask('CSS_min', ['cmq', 'cssmin:styleCSS']);

};