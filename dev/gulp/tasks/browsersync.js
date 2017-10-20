var gulp = require('gulp');

// Config
var config = require('../config').browserSync;

// Tool
var browsersync = require('../tools/browsersync');

gulp.task('browsersync', function(){
	browsersync.init(config);
});