var gulp = require('gulp');
var newer = require('gulp-newer');

// Config
var config = require('../config').fonts;

// Tool
var browsersync = require('../tools/browsersync');

// Fonts task
gulp.task('fonts', function(){
	return gulp.src(config.src)
		.pipe(newer(config.dest))
		.pipe(gulp.dest(config.dest))
		.pipe(browsersync.reload({stream: true}));
});
