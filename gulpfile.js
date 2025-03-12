const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const purgecss = require("gulp-purgecss");
const rename = require("gulp-rename");

// Compilación de SASS
const css = () => {
  return src("src/scss/app.scss")
    .pipe(
      sass({ outputStyle: "expanded", quietDeps: true }).on(
        "error",
        sass.logError
      )
    ) // Manejo de errores de SASS
    .pipe(dest("build/css"));
};

const cssbuild = (done) => {
  src("build/css/app.css")
    .pipe(rename({ suffix: ".min" }))
    .pipe(purgecss({ content: ["index.html"] }))
    .pipe(dest("build/css"));
  done();
};

// Función para observar cambios en archivos SCSS
const dev = () => {
  watch("src/scss/**/*.scss", css);
};

const image = () => {
  return src("src/img/**/*")
    .pipe(imagemin({ optimizationLevel: 3 }))
    .pipe(dest("build/img"));
};

exports.css = css;
exports.dev = dev;
exports.image = image;
// Tarea por defecto: ejecutar imágenes, compilar SASS y observar cambios
exports.default = series(image, css, dev);
exports.build = series(cssbuild);
