const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const webserver = require('gulp-webserver');

// Image optimization task
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 85, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/images'));
});

// Copy HTML files from cf-pages
gulp.task('html', function() {
  return gulp.src('cf-pages/**/*.html')
    .pipe(gulp.dest('dist'));
});

// Copy CSS files from cf-pages
gulp.task('css', function() {
  return gulp.src('cf-pages/**/*.css')
    .pipe(gulp.dest('dist'));
});

// Copy JavaScript files from cf-pages
gulp.task('js', function() {
  return gulp.src(['cf-pages/**/*.js', '!cf-pages/**/gulpfile.js'])
    .pipe(gulp.dest('dist'));
});

// Development server
gulp.task('serve', function() {
  return gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8000
    }));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('images/**/*', gulp.series('images'));
  gulp.watch('cf-pages/**/*.html', gulp.series('html'));
  gulp.watch('cf-pages/**/*.css', gulp.series('css'));
  gulp.watch('cf-pages/**/*.js', gulp.series('js'));
});

// Default build task
gulp.task('build', gulp.parallel('html', 'css', 'js', 'images'));

// Default task
gulp.task('default', gulp.series('build'));

// Development task
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
