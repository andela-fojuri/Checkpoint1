var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('hello', function() {
  // Stuff here
  console.log('Hello Zell');
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  });
});

gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('src/css'))
    //.pipe(gulp.dest('destination'))
    .pipe(browserSync.reload({
      stream: true
  }));
    
});

gulp.task('jasmine', function(){
	var filesForTest = ['src/js/**/*.js','jasmine/spec/**/*.js'];
	return gulp.src(filesForTest)
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({port: 8888}));
	
});

gulp.task('watch',['browserSync', 'sass', 'jasmine'], function(){
	var filesForTest = ['src/js/**/*.js','jasmine/spec/**/*.js'];
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  gulp.watch('src/html/**/*.html', browserSync.reload); 
  gulp.watch('src/js/**/*.js', browserSync.reload);
  gulp.watch(filesForTest, browserSync.reload);

  // Other watchers
});