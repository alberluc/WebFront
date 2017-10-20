var gulp = require('gulp');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');

// Config
var config_css = require('../config').css;
var config_js = require('../config').js;

gulp.task('vendor-js', function(){
	return gulp.src(config_js.src)
		.pipe(newer(config_js.dest + '/' + config_js.outputName))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(concat(config_js.outputName))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config_js.dest));
});

gulp.task('vendor-css', function(){
	return gulp.src(config_css.src)
		.pipe(newer(config_css.dest + config_css.outputName))
		.pipe(sourcemaps.init())
		.pipe(concat(config_css.outputName))
		.pipe(minify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config_css.dest));
});


gulp.task('vendor', ['vendor-css', 'vendor-js']);
