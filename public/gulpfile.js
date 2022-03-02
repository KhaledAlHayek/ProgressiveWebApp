const gulp = require("gulp"),
      sass = require("gulp-sass")(require("sass")),
      prefix = require("gulp-autoprefixer"),
      concat = require("gulp-concat"),
      minify = require("gulp-minify"),
      srcmap = require("gulp-sourcemaps"),
      notify = require("gulp-notify");

gulp.task("css", () => {
  return gulp.src("./sass/main.sass")
    .pipe(srcmap.init())
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(prefix("last 2 versions"))
    .pipe(concat("main.css"))
    .pipe(srcmap.write("."))
    .pipe(gulp.dest("./css/"))
})

gulp.task("watch", () => {
  gulp.watch("./sass/main.sass", gulp.series("css"));
})