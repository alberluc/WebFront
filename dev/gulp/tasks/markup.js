var gulp = require('gulp');
var newer = require('gulp-newer');

// Config
var config = require('../config').html;

// Tools
var browsersync = require('../tools/browsersync');

// Theme files
gulp.task('markup', function(){
	return gulp.src(config.src)
		.pipe(newer(config.dest))
		.pipe(gulp.dest(config.dest))
		.pipe(browsersync.reload({stream: true}));
});