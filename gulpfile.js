var gulp = require('gulp');
var sass = require('gulp-sass');
const stripCssComments = require('gulp-strip-css-comments');
var cssnano = require('gulp-cssnano');

gulp.task('sass', function () {
  gulp.src('./src/app/components/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano({
        discardComments: {removeAll: true}
    }))
    .pipe(gulp.dest('./src/app/static/css'));
});
gulp.task('sass:watch', function () {
    gulp.watch('./src/app/components/scss/*.scss', gulp.series('sass'));
  });