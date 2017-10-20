var gulp = require('gulp');

// Config
var config = require('../config');

// Watch task
gulp.task('watch', ['watchify', 'browsersync'], function(){
	gulp.watch(config.sass.watch, ['sass']);
	gulp.watch(config.images.src, ['images']);
	gulp.watch(config.fonts.src, ['fonts']);
	gulp.watch(config.html.src, ['markup']);
	gulp.watch(config.datas.src, ['datas']);
});
