const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jasmineBrowser = require('gulp-jasmine-browser');
const watch = require('gulp-watch');
const browserify = require('gulp-browserify');

const rename = require('gulp-rename');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  });
});

gulp.task('test', () => {
  gulp.src('./jasmine/spec/inverted-index-test.js')
    .pipe(browserify({ watch: true }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build'));
});

gulp.task('jasmine', () => {
  const filesForTest = ['jasmine/less/**/*'];
  return gulp.src(filesForTest)
    .pipe(watch(filesForTest))
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 8888 }));
});

gulp.task('sass', () => gulp.src('src/scss/**/*.scss')
  .pipe(sass()) // Using gulp-sass
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.reload({ stream: true })));


gulp.task('watch', ['browserSync', 'sass'], () => {
  const filesForTest = ['src/js/**/*.js', 'jasmine/spec/**/*.js'];
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', browserSync.reload);
  gulp.watch('src/**/*.js', browserSync.reload);
  gulp.watch('jasmine/build/bundle.js', browserSync.reload);
  gulp.watch(filesForTest, browserSync.reload);
});

gulp.task('default', ['watch', 'test']);
