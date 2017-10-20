var gulp = require('gulp');
var browserifier = require('./browserify');

// Watchify task
gulp.task('watchify', function(callback){
	browserifier(callback, true);
});