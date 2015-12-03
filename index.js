var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var path = require('path');
var Elixir = require('laravel-elixir');

var config = Elixir.config;

Elixir.extend('svgstore', function(srcDir, output) {
  config.svg = {
    folder: 'svg' || srcDir,
    outputFolder: 'svg'
  };

  var output = output || 'store.svg';

  new Elixir.Task('svgstore', function () {

    gulp.task('svgstore', function() {
      return gulp
        .src(config.get('assets.svg.folder') + "/**/*.svg")
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
        .pipe(rename(output))
        .pipe(gulp.dest(config.get('public.svg.outputFolder')))
        .pipe(new Elixir.Notification('SVGs Compiled!'));

    });
  })
  .watch(config.get('assets.svg.folder') + '/**/*.svg');
});
