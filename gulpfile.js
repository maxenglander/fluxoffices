var gulp
  , gutil
  , webpack
  , webpackConfig;

gulp = require('gulp');
gutil = require('gulp-util');
webpack = require('webpack');
webpackConfig = require(__dirname + '/webpack.config.js');

gulp.task('default', ['webpack']);
gulp.task('webpack', function (callback) {
    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError(err);
        }
        callback();
    });
});
