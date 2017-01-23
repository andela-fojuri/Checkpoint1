var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var jasmineBrowser = require('gulp-jasmine-browser');
var jasmineBrowser2 = require('gulp-jasmine-livereload-task');
var webpack = require('webpack-stream');
var webpack2 = require('gulp-webpack');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var named = require('vinyl-named');
var karma = require('gulp-karma');
var Server = require('karma').Server;
var server = require('karma-server-side');
var rename = require('gulp-rename');


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

gulp.task('bundle-files', function() {
  gulp.src("./src/inverted-index.js")
    .pipe(browserify({}))
    .pipe(gulp.dest('./src/build'));
});

gulp.task('bundle-files2', function() {
  gulp.src("./jasmine/spec/inverted-index-test.js")
    .pipe(browserify({watch: true}))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build'));
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

gulp.task('jasmineBrowser',function(){
  var JasminePlugin = require('gulp-jasmine-browser/webpack/jasmine-plugin');
  var plugin = new JasminePlugin();
	var filesForTest = ['jasmine/spec/inverted-index-test.js'];
	return gulp.src(filesForTest) 
  .pipe(webpack({watch: true, output: {filename: 'spec.js'}}))
  .pipe(jasmineBrowser.specRunner({specRunner:'/jasmine/SpecRunner.html'}))
  .pipe(jasmineBrowser.server({}));	
});

gulp.task('default', ['browerSync','script']);


gulp.task('jasmineBrowser2',['bundle-files2'], jasmineBrowser2({
    files: ['./src/build/inverted-index.js','./jasmine/build/inverted-index-test.js'],
    watch: {
        options: {
            debounceTimeout: 900, //The number of milliseconds to debounce. 
            debounceImmediate: true //This option when set will issue a callback on the first event. 
        },
    },
    livereload: 35751,
    specRunner: "./jasmine/"
}));

gulp.task('specs', function () {
  return gulp.src('jasmine/spec/**.js')
    .pipe(jasmine());
});

gulp.task('spec-watch', function() {
    gulp.watch(['jasmine/specs/**.js', 'src/**/*.js'], ['test'])
});


gulp.task('test', function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src(['src/inverted-index.js', 'jasmine/spec/inverted-index-test.js'])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

gulp.task('test2', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
   // frameworks: ['jasmine', 'browserify'],
  }, done).start();
});



gulp.task('autotest', function() {
  return gulp.watch(['src/inverted-index.js', 'jasmine/spec/inverted-index-test.js'], ['test']);
});



gulp.task('watch',['bundle-files','browserSync', 'sass'], function(){
	var filesForTest = ['src/js/**/*.js','jasmine/spec/**/*.js'];
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  gulp.watch('src/**/*.html', ['bundle-files'], browserSync.reload); 
  gulp.watch('src/**/*.js', ['bundle-files', browserSync.reload ]);
  gulp.watch(filesForTest, ['bundle-files'], browserSync.reload);

  // Other watchers
});