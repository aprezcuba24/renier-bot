var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('static-files', function () {
    gulp.src('src/**/*.css')
      .pipe(gulp.dest('dist'));
    gulp.src('src/**/*.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/**/*.json')
      .pipe(gulp.dest('dist'));
});

gulp.task("compile-all", function () {
    return gulp.src("src/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("dist"));
});

gulp.task('watch', function () {
    gulp.watch(['src/**/*.js'], ['compile-all']);
    gulp.watch(['src/**/*.json', 'src/**/*.html', 'src/**/*.css'], ['static-files']);
});

gulp.task('postinstall', ['compile-all', 'static-files']);
gulp.task('default', ['watch', 'compile-all', 'static-files']);
