var dest = '../www/';
var src = 'src';
var maps = 'maps';

module.exports = {

	clean: {
		src: [
			dest,
			maps
		]
	},

	production: {
		src: [
			dest + '/**/*.+(js|css).map',
		],
		dest: maps
	},

	browserSync: {
		proxy: "localhost:84",
		watchOptions: {
			ignoreInitial: true
		}
	},

	sass: {
		watch: [
			src + '/**/*.scss'
		],
		src: [
			src + '/styles/style.scss'
		],
		dest: dest + '/styles'
	},

	images: {
		src: [
			src + '/images/**/*'
		],
		dest: dest + '/images'
	},

	medias: {
		src: [
			src + '/medias/**/*'
		],
		dest: dest + '/medias'
	},

	fonts: {
		src: [
			src + '/fonts/**/*'
		],
		dest: dest + '/fonts'
	},

    datas: {
        src: [
            src + '/datas/**/*'
        ],
        dest: dest + '/datas'
    },

	html: {
		src: [
			src + '/htdocs/**/*'
		],
		dest: dest
	},

	browserify: {

		libs: [
			'lodash',
			'debug'
		],

		bundles: [{
			debug: true,
			paths: src,
			entries: src + '/scripts/main.js',
			dest: dest + '/scripts/',
			outputName: 'main.js'
		}],

		vendors: {
			debug: true,
			paths: src,
			entries: [],
			dest: dest + '/scripts/',
			outputName: 'libs.js'
		}
	},

	css: {
		src: [src + '/styles/libs/**/*.css'],
		dest: dest + '/styles/',
		outputName: 'libs.css'
	},

	js: {
		src: [src + '/scripts/libs/**/*.js'],
		dest: dest + '/scripts/',
		outputName: 'libs.js'
	}
};
