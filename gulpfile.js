// https://zellwk.com/blog/nunjucks-with-gulp/

var gulp = require('gulp'),
  debug = require('gulp-debug'),
  plumber = require('gulp-plumber'),
  nunjucksRender = require('gulp-nunjucks-render'),
  sass = require('gulp-sass'),
  bs = require('browser-sync').create(),
  del = require('del'),
  rev = require('gulp-rev');

gulp.task('clean-html', function() {
  del.sync(['public/*.html']);
})

gulp.task('merge-html', ['clean-html'], function() {
  return gulp.src('source/pages/*.html')
//  .pipe(plumber())
  .pipe(nunjucksRender({
      path: ['source/templates']
    }))
  //.pipe(rev())
  .pipe(debug({minimal: true}))
  .pipe(gulp.dest('public'))
  
});

gulp.task('sass', function() {
  return gulp.src('source/sass/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('public/css'))
});

gulp.task('watch', function(){
    gulp.watch('source/**/*.html', ['merge-html']);
    gulp.watch('source/templates/partials/*.html', ['merge-html']);
});

gulp.task('bs', function() {
  bs.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch('./public/*.html').on('change', bs.reload);
})

gulp.task('default', ['merge-html', 'watch', 'bs'])
gulp.task('test', ['merge-html'])

/* the following task is only the extend usage of npm package api */

gulp.task('dry-clean', function() {
  del(['public/**'],{dryRun: true}).then(paths => {console.log(paths.join('\n'))})
});