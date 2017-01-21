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
    .pipe(browserify({}))
    .pipe(gulp.dest('./jasmine/build'));
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
	var filesForTest = ['./jasmine/spec/inverted-index-test.js'];
	return gulp.src(filesForTest) 
  .pipe(webpack({watch: true, target:"node",output: {filename: './jasmine/build'}}))
 //.pipe(watch(filesForTest, ['bundle-files2']))
 //.pipe(webpack2({entry: {app: 'src/inverted-index.js', test: 'jasmine/spec/inverted-index-test.js' } ,watch: true, "target":"node",output: {filename: 'jasmine/spec/inverted-index-test.js'}}))
 //.pipe(webpack({watch:true, target:"node", output: {filename: 'spec/bundle.js'}}))
  //.pipe(webpack({watch: true,output: {filename: 'src/inverted-index.js'}}))
  .pipe(jasmineBrowser.specRunner('./jasmine/SpecRunner.html'))
  .pipe(jasmineBrowser.server({port:8857}));
	
});


gulp.task('jasmineBrowser2',['bundle-files'], jasmineBrowser2({
    files: ['src/build/inverted-index.js','jasmine/spec/inverted-index-test.js'],
    watch: {
        options: {
            debounceTimeout: 1000, //The number of milliseconds to debounce. 
            debounceImmediate: true //This option when set will issue a callback on the first event. 
        },
    },
    livereload: 35751,
    

}));






gulp.task('watch',['bundle-files','browserSync', 'sass'], function(){
	var filesForTest = ['src/js/**/*.js','jasmine/spec/**/*.js'];
  gulp.watch('src/scss/**/*.scss', ['sass']); 
  gulp.watch('src/**/*.html', ['bundle-files'], browserSync.reload); 
  gulp.watch('src/**/*.js', ['bundle-files', browserSync.reload ]);
  gulp.watch(filesForTest, ['bundle-files'], browserSync.reload);

  // Other watchers
});