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

// Copy HTML files
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

// Copy CSS files
gulp.task('css', function() {
  return gulp.src('*.css')
    .pipe(gulp.dest('dist'));
});

// Copy JavaScript files
gulp.task('js', function() {
  return gulp.src(['*.js', '!gulpfile.js'])
    .pipe(gulp.dest('dist'));
});

// Copy .nojekyll file
gulp.task('nojekyll', function() {
  return gulp.src('.nojekyll')
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
  gulp.watch('*.html', gulp.series('html'));
  gulp.watch('*.css', gulp.series('css'));
  gulp.watch('*.js', gulp.series('js'));
});

// Default build task
gulp.task('build', gulp.parallel('html', 'css', 'js', 'images', 'nojekyll'));

// Default task
gulp.task('default', gulp.series('build'));

// Development task
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
