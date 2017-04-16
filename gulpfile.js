"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local web dev server
var open = require('gulp-open'); //opens URL in web browser
var config = require('./gulp.config.js')();

var browserify = require('browserify'); //bundles js files for browser to understand
var reactify = require('reactify'); //transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text stream with gulp

//start a local dev server
gulp.task('connect', function(){
	connect.server({
		port: config.port,
		root: ['dist'], //root of the server
		base: config.devBaseURL,
		livereload: true
	});
});

//run task connect and then task open
gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
		.pipe(open({uri: config.devBaseURL + ":" + config.port + "/", app: 'Google Chrome'}));
});

//copy html files to destination dist and reload the local dev server (Connect)
gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload()); //reload the local dev server
});

gulp.task('js', function(){
	browserify(config.paths.mainJS)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ["html", "js", "open", "watch"]);