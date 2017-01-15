var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var jasmineBrowser = require('gulp-jasmine-browser');
var jasmineBrowser2 = require('gulp-jasmine-livereload-task');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');


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

gulp.task('jasmineBrowser', function(){
  
	var filesForTest = ['src/inverted-index.js','jasmine/spec/inverted-index-test.js'];
	return gulp.src(filesForTest)
  .pipe(webpack({watch: true, "target":"node",output: {filename: 'jasmine/spec/inverted-index-test.js'}}))
  .pipe(jasmineBrowser.specRunner('jasmine/SpecRunner.html'))
   // .pipe(jasmineBrowser.headless());
    .pipe(jasmineBrowser.server({port:8891}));
	
});

gulp.task('webpack', function(callback) {
    // run webpack
    webpack({
        // configuration
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('jasmineBrowser2', jasmineBrowser2({

    files: ['src/inverted-index.js','jasmine/spec/inverted-index-test.js'],
    watch: {
        options: {
            debounceTimeout: 1000, //The number of milliseconds to debounce. 
            debounceImmediate: true //This option when set will issue a callback on the first event. 
        },
    },
    livereload: 35751,
    

}));




gulp.task('watch',['browserSync', 'sass', 'jasmine'], function(){
	var filesForTest = ['src/js/**/*.js','jasmine/spec/**/*.js'];
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  gulp.watch('src/html/**/*.html', browserSync.reload); 
  gulp.watch('src/js/**/*.js', browserSync.reload);
  gulp.watch(filesForTest, browserSync.reload);

  // Other watchers
});