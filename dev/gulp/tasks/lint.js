var gulp = require('gulp');
var eslint = require('gulp-eslint');

// Config
var config = require('../config').lint;

// Tool
var errors = require('../tools/errors');
var browsersync = require('../tools/browsersync');

// Lint task
function lint(){
	return gulp.src(config.js.src)
		.pipe(eslint())
		.pipe(eslint.format());
}

gulp.task('lint', lint);

gulp.task('lint-fail', function lintFail(){
	return lint().pipe(eslint.failOnError());
});