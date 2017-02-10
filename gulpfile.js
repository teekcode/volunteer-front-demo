// https://zellwk.com/blog/nunjucks-with-gulp/

/*
Usage: 
1. run `gulp merge web` refresh the project
2. run `gulp watch` thread 1
3. run `gulp bs` thread 2
*/

var gulp = require('gulp'),
  debug = require('gulp-debug'),
  plumber = require('gulp-plumber'),
  nunjucksRender = require('gulp-nunjucks-render'),
  sass = require('gulp-sass'),
  bs = require('browser-sync').create();

gulp.task('merge-web', function() {
  return gulp.src('source/pages/*.html')
  .pipe(plumber())
  .pipe(nunjucksRender({
      path: ['source/templates']
    }))
  .pipe(debug({minimal: true}))
  .pipe(gulp.dest('public'))
  
});

gulp.task('sass', function() {
  return gulp.src('source/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('public/css'))
});

gulp.task('watch', function(){
    gulp.watch('source/**/*.html', ['merge-web']);
    gulp.watch('source/templates/partials/*.html', ['merge-web']);
});

gulp.task('bs', function() {
  bs.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch('./public/*.html').on('change', bs.reload);
})
