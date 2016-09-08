'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



// Static server
gulp.task('staticServer', function() {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
});



gulp.task('build:templates', function () {
	var templateData = require('./src/json/home');
	//var templateData = require('./src/json/searchlist');
	var options = {
		ignorePartials:true,
		batch:['./src/templates/']
	}

	return gulp.src('src/templates/shop/home.hbs')
	//return gulp.src('src/templates/shop/searchResult.hbs')
	.pipe(handlebars(templateData, options))
	.pipe(rename('index.html'))
	//.pipe(rename('searchResult.html'))
	.pipe(gulp.dest('./build/'))
	.pipe(browserSync.reload({stream:true}));
});



gulp.task('build:scripts', function(){
	return gulp.src(['src/js/libs/jquery.1.7.2.js', 'src/js/**/*.js'])
		.pipe(concat('index.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./build/js/'))
		.pipe(browserSync.reload({stream:true}));

});

 
gulp.task('build:sass', function () {
	return gulp.src('src/css/**/*.css')
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.reload({stream:true}));
		//return gulp.src('src/sass/**/*.scss')
		/*.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.reload({stream:true}));*/
});
 
gulp.task('watch', function () {
	gulp.watch('./src/templates/**/*.hbs', ['build:templates'])
	gulp.watch('./src/css/**/*.css', ['build:sass']);
	gulp.watch('./src/js/**/*.js', ['build:scripts']);
});



gulp.task('default', ['staticServer', 'watch']);
gulp.task('build', ['build:templates', 'build:scripts', 'build:sass']);