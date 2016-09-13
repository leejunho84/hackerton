'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


// Static server
gulp.task('staticServer', function() {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
});


gulp.task('build:templates', ['build:scripts', 'build:sass'], function(){
	var templateData = require('./src/json/home');
	//var templateData = require('./src/json/searchlist');
	var options = {
		ignorePartials:true,
		batch:['./src/templates/shop/partials']
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
	return gulp.src(['src/js/libs/jquery.1.7.2.js', 'src/js/**/*.js'])	// 배열을 통해 파일 순서를 정해줄 수 있다.
		.pipe(concat('index.js'))	// 여러 스크립트 파일 합치기
		.pipe(uglify())			// 합친 스크립트 파일 난독화
		.pipe(gulp.dest('./build/js/'))
		.pipe(browserSync.reload({stream:true}));

});


gulp.task('build:sass', function(){
	return gulp.src('src/sass/*.scss')
	.pipe(sourcemaps.init({loadMaps: true, debug: true}))
	.pipe(sass({outputStyle:"compressed"})
	.on('error', sass.logError))
	.pipe(rename('common.css'))
	.pipe(sourcemaps.write('./src'))
	.pipe(gulp.dest('./build/css/'))
	.pipe(browserSync.reload({stream:true}))
});
 

gulp.task('watch', function () {
	gulp.watch('./src/templates/**/*.hbs', ['build:templates']);
	gulp.watch('./src/sass/**/*.scss', ['build:sass']);
	gulp.watch('./src/js/**/*.js', ['build:scripts']);
});


gulp.task('default', ['staticServer', 'watch']);
gulp.task('build', ['build:templates']);