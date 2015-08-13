var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    zip = require("gulp-zip");

gulp.task('ugly', function (){
  return gulp.src('jquery.countUp.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js'}))
    .pipe(gulp.dest('novem-counter'));  
});

gulp.task('zip', ['ugly'], function (){
  return gulp.src('novem-counter/*')
    .pipe(zip('novem-counter.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['zip']);