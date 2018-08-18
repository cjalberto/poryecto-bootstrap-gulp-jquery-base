const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src([
    'bower_components/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src([
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './src'
  });

  gulp.watch([
    'bower_components/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ], ['sass']);

  gulp.watch('src/*.html').on('change', browserSync.reload);

});

gulp.task('font-awesome', () => {
  return gulp.src('bower_components/font-awesome/web-fonts-with-css/css/fontawesome.min.css')
  .pipe(gulp.dest('src/css'));
})

gulp.task('fonts', () => {
  return gulp.src('bower_components/font-awesome/web-fonts-with-css/webfonts/*')
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('default', ['js', 'serve', 'font-awesome', 'fonts'])
