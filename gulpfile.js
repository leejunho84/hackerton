'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



// Static server
gulp.task('staticServer', ['build:templates'], function() {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
});



gulp.task('build:templates', ['build:scripts'], function () {
	var templateData = require('./src/json/dummy');
	var options = {
		ignorePartials:true,
		batch:['./src/templates/partials']
	}

	return gulp.src('src/templates/home.hbs')
	.pipe(handlebars(templateData, options))
	.pipe(rename('index.html'))
	.pipe(gulp.dest('./build/'));
});



gulp.task('build:scripts', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(concat('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js/'));
});

 
gulp.task('build:sass', function () {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build/css'));
});

 
gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['build:sass']);
});


gulp.task('default', ['staticServer']);