const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const imageMin = require("gulp-imagemin");

function vendor(done) {
  // jQuery
  gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./public/vendor/jquery"));

  // Bootstrap
  gulp
    .src(["./node_modules/bootstrap/dist/**/*"])
    .pipe(gulp.dest("./public/vendor/bootstrap"));

  done();
}

function compileSCSS() {
  return gulp
    .src("./public/stylesheets/sass/**/*.scss")
    .pipe(
      sass
        .sync({
          outputStyle: "expanded"
        })
        .on("error", sass.logError)
    )
    .pipe(gulp.dest("./public/stylesheets/css"));
}

function minifyCSS() {
  return gulp
    .src([
      "./public/stylesheets/css/*.css",
      "!./public/stylesheets/css/*.min.css"
    ])
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./public/stylesheets/css"));
}

function minifyJS() {
  return gulp
    .src(["./public/javascripts/*.js", "!./public/javascripts/*.min.js"])
    .pipe(terser())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .on("error", err => {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(gulp.dest("./public/javascripts"));
}

function minifyImages() {
  return gulp
    .src(["./public/images/*.png", "!./public/images/*.min.png"])
    .pipe(imageMin())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .on("error", err => {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(gulp.dest("./public/images"));
}

function watchFiles(done) {
  gulp.watch(
    "./public/stylesheets/sass/*.scss",
    gulp.series(compileSCSS, minifyCSS)
  );
  gulp.watch(["./public/javascripts/*.js", "!./public/javascripts/*.min.js"], minifyJS);
  gulp.watch("./public/images/*", minifyImages);
  done();
}

gulp.task("vendor", vendor);
gulp.task("css", gulp.series(compileSCSS, minifyCSS));
gulp.task("js", minifyJS);
gulp.task("images", minifyImages);
gulp.task(
  "default",
  gulp.parallel(
    vendor,
    gulp.series(compileSCSS, minifyCSS),
    minifyJS,
    minifyImages
  )
);
gulp.task("dev", watchFiles);