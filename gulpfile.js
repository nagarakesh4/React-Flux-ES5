"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local web dev server
var open = require('gulp-open'); //opens URL in web browser
var config = require('./gulp.config.js')();

var browserify = require('browserify'); //bundles js files for browser to understand
var reactify = require('reactify'); //transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text stream with gulp

var concat = require('gulp-concat'); //concatenate files (css bootstrap)

var lint = require('gulp-eslint'); //will lint js files including jsx

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

//browserify the js files, and copy the files to dist folder bundle.js file
gulp.task('js', function(){
	browserify(config.paths.mainJS)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js')) //bundle all js to bundle.js
		.pipe(gulp.dest(config.paths.dist + '/scripts')) //keep bundle.js in this folder
		.pipe(connect.reload());
});

//css task
gulp.task('css', function(){
	gulp.src(config.paths.css) //look for css paths
		.pipe(concat('bundle.css')) //concatenate and keep in bundle.css
		.pipe(gulp.dest(config.paths.dist + '/css')); //paste them in css
});

gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(lint({configFile: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']); //each time js changes also test lint
});

gulp.task('default', ["html", "js", "css", "lint", "open", "watch"]);