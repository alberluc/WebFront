var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-clean-css');

// Tool
var errors = require('../tools/errors');
var browsersync = require('../tools/browsersync');

// Config
var config = require('../config').sass;

// Sass task
gulp.task('sass', function () {
	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', errors)
		.pipe(minify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dest))
		.pipe(browsersync.stream({match: '**/*.css'}));
});