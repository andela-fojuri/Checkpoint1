const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jasmine = require('gulp-jasmine');
const jasmineBrowser = require('gulp-jasmine-browser');
const jasmineBrowser2 = require('gulp-jasmine-livereload-task');
const webpack = require('webpack-stream');
const webpack2 = require('gulp-webpack');
const watch = require('gulp-watch');
const browserify = require('gulp-browserify');
const named = require('vinyl-named');
const karma = require('gulp-karma');
const Server = require('karma').Server;
const server = require('karma-server-side');
const rename = require('gulp-rename');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  });
});

gulp.task('bundle-files', () => {
  gulp.src('./src/inverted-index.js')
    .pipe(browserify({}))
    .pipe(gulp.dest('./src/build'));
});

gulp.task('test', () => {
  gulp.src('./jasmine/spec/inverted-index-test.js')
    .pipe(browserify({ watch: true }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build'));
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass()) // Using gulp-sass
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.reload({ stream: true }));
});


gulp.task('watch', ['browserSync', 'sass'], () => {
  const filesForTest = ['src/js/**/*.js', 'jasmine/spec/**/*.js'];
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', browserSync.reload);
  gulp.watch('src/**/*.js', browserSync.reload);
  gulp.watch(filesForTest, browserSync.reload);
});

gulp.task('default', ['watch', 'test']);
