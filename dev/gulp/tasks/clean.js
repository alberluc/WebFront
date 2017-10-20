var gulp = require('gulp');
var del = require('del');
var vinyl = require('vinyl-paths');

// Config
var config = require('../config').clean;

// Clean task
gulp.task('clean', function(){
	return gulp.src(config.src)
		.pipe(vinyl(del));
});
