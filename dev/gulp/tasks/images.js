var gulp = require('gulp');
var newer = require('gulp-newer');

// Config
var config_images = require('../config').images;
var config_medias = require('../config').medias;

// Tool
var browsersync = require('../tools/browsersync');

// Images task
gulp.task('images-images', function(){
	return gulp.src(config_images.src)
		.pipe(newer(config_images.dest))
		.pipe(gulp.dest(config_images.dest))
		.pipe(browsersync.reload({stream: true}));
});

// Medias task
gulp.task('images-medias', function(){
	return gulp.src(config_medias.src)
		.pipe(newer(config_medias.dest))
		.pipe(gulp.dest(config_medias.dest))
		.pipe(browsersync.reload({stream: true}));
});

// Images task
gulp.task('images', ['images-images', 'images-medias']);
