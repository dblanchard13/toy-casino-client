var gulp    = require('gulp');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack-stream');
var todo    = require('gulp-todoist');
var path    = require('path');
var yargs   = require('yargs').argv;
var tpl     = require('gulp-template');
var rename  = require('gulp-rename');

/*
  Map of paths for using with the tasks below
 */
var paths = {
  entry: 'client/app/app.js',
  app: ['client/app/**/*.{js,styl,html}', 'client/styles/**/*.styl'],
  js: 'client/app/**/*!(.spec.js).js',
  styl: ['client/app/**/*.styl', 'client/style/**/*.styl'],
  toCopy: ['client/index.html'],
  html: ['client/index.html', 'client/app/**/*.html'],
  dest: 'dist',
  prodDest: '../php-client/',
  blankTemplates: 'templates/component/*.**'
};

// helper function
var resolveToComponents = function(){
  return path.join('client', 'app/components');
};

gulp.task('todo', function() {
  return gulp.src(paths.js)
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('build', ['todo'], function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('buildProd', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.prodDest));
});

gulp.task('serve', function() {
  // By invoking browser-sync immediately instead of using one of its methods, we initiate a singleton object
  browser({
    // Serves a Borwser Sync specific UI for editing connections/mirroring across devices/etc.
    ui: {
      port: 3600
    },
    port: process.env.PORT || 4500,
    // Automatically opens a browser at http://localhost:4500 on server startup
    open: true,
    // Stops inputs from being mirrored on other devices
    ghostMode: false,
    // Gives the path from which to statically serve the app
    server: {
      baseDir: 'dist'
    }
  });
});

/*
  Simple task to copy over needed files to dist
 */
gulp.task('copy', function() {
  return gulp.src(paths.toCopy, { base: 'client' })
    .pipe(gulp.dest(paths.dest));
});

/*
  Task to watch files for changes and call build and copy tasks
 */
gulp.task('watch', function() {
  gulp.watch(paths.app, ['build', browser.reload]);
  gulp.watch(paths.toCopy, ['copy', browser.reload]);
});

/*
  Task for creating new component from template files in ./templates/component
*/
gulp.task('component', function(){
  var cap = function(val){
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(tpl({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('component', name);
    }))
    .pipe(gulp.dest(destPath));
});


gulp.task('default', function(done) {
  sync('build', 'copy', 'serve', 'watch', done)
});
