var gulp = require('gulp');

// Build task
gulp.task('build', ['markup', 'images', 'fonts', 'sass', 'vendor']);