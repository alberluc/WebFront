var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var shim = require('browserify-shim');
var _ = require('lodash');

// Config
var config = require('../config').browserify;

// Tool
var errors = require('../tools/errors');
var browsersync = require('../tools/browsersync');

// Browserify task
var browserifier = function(callback, devMode){

	config.bundles.forEach(function external(bundle){
		bundle.external = config.libs;
	});

	if(!devMode){
		config.vendors.require = config.libs;
		config.bundles.push(config.vendors);
	}

	var queue = 1;

	// Bundlefy
	var bundlefy = function(config){

		if(devMode){
			_.extend(config, watchify.args);
		}

		// Bundlefy
		var bundlefy = function(){

			var bundle = browserifyer.bundle()
				.on('error', errors)
				.pipe(source(config.outputName))
				.pipe(buffer())
				.pipe(sourcemaps.init({loadMaps: true}))
				.pipe(uglify());

			return bundle.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest(config.dest))
				.on('end', bundlefied)
				.pipe(browsersync.reload({stream: true}));
		};

		// Bundlefied
		var bundlefied = function(){
			if(queue){
				queue--;
				if(queue === 0){
					callback();
				}
			}
		};

		// Browserifyer
		var browserifyer = browserify(config).transform(shim, {global: true}).transform(babelify, {
			presets: ["es2015"],
			sourceMapsAbsolute: true
		});

		if(devMode){
			browserifyer = watchify(browserifyer);
			browserifyer.on('update', bundlefy);
		}

		if(config.require){
			browserifyer.require(config.require);
		}

		if(config.external){
			browserifyer.external(config.external);
		}

		if(config.ignore){
			config.ignore.forEach(function ignore(module){
				browserifyer.ignore(module);
			});
		}

		return bundlefy();
	};

	config.bundles.forEach(bundlefy);
};

gulp.task('browserify', browserifier);
module.exports = browserifier;
