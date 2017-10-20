var gulp = require('gulp');
var browserifier = require('./browserify');

// Watch task
gulp.task('script', [], function(callback){
	browserifier(callback, false);
});
