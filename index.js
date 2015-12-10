var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var path = require('path');
var Elixir = require('laravel-elixir');

var config = Elixir.config;

Elixir.extend('svgstore', function(baseDir, output) {
  config.svg = {
    folder: 'svg',
    outputFolder: 'svg'
  };

  var paths = prepGulpPaths('**/*.svg', baseDir, output);

  new Elixir.Task('svgstore', function () {
    this.log(paths.src, paths.output);

    return gulp
      .src(paths.src.path)
      .pipe(svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));

        return {
          plugins: [{
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
        }
      }))
      .pipe(svgstore())
      .on('error', function (e) {
        new Elixir.Notification().error(e, 'SVG Compilation Failed');

        this.emit('end');
      })
      .pipe(rename(paths.output.name))
      .pipe(gulp.dest(paths.output.baseDir))
      .pipe(new Elixir.Notification('SVGs Compiled!'));

  })
  .watch(paths.src.path)
  .ignore(paths.output.path);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null} baseDir
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, baseDir, output) {
  return new Elixir.GulpPaths()
    .src(src, baseDir || config.get('assets.svg.folder'))
    .output(output || config.get('public.svg.outputFolder'), 'sprites.svg');
};
