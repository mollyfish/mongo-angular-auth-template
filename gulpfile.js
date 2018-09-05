var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('build:css', function() {
  gulp.src('./app/style/**/*.{sass,scss}')
  .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest('build/style/'));
});

gulp.task('build:fonts', function() {
  return gulp.src('./app/style/fonts/*')
  .pipe(gulp.dest('build/style/fonts/'));
});

gulp.task('build:images', function() {
  return gulp.src('./app/imgs/*')
  .pipe(gulp.dest('build/imgs/'));
});

gulp.task('webpack:dev', function() {
	return gulp.src('./app/js/client.js')
		.pipe(webpack({
			output: {
				filename: 'bundle.js'
			}
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function() {
	return gulp.src('./app/**/*html')
		.pipe(gulp.dest('build/')); 
});

gulp.task("watch:css", ["build:css"], function() {
  gulp.watch("./app/**/*.html", ["build:css"]);
  gulp.watch("./app/style/**/*.scss", ["build:css"]);
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev', 'build:css', 'build:fonts', 'build:images']);
gulp.task('default', ['build:dev']);
