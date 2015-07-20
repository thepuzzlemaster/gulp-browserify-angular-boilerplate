var _ = require('lodash');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var connect = require('gulp-connect');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var less = require('gulp-less');
var ngHtml2Js = require('browserify-ng-html2js');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var watchify = require('watchify');

var isDev = false;
var isProduction = false;

// location maps
var copyLocations = [
  {
    src: './node_modules/bootstrap/dist/css/bootstrap.css',
    dest: './public'
  },
  {
    src: './src/assets/**/*.*',
    dest: './public/assets'
  },
  {
    src: './src/**/*.html',
    dest: './public'
  }
];

var watchLocations = {
  less: ['./src/less/**/*.less', '!./src/less/partials/**/*']
  // js: ''
};

var destLocations = {
  less: './public'
};

// error handling
var onError = function(err) {
  gutil.log(gutil.colors.red('ERROR', err.plugin), err.message);
  gutil.beep();
  new gutil.PluginError(err.plugin, err, {showStack: true})
  // this.emit('end');
};

// ////////////////////////////////////////////////
// CLEAN
// ////////////////////////////////////////////////
gulp.task('clean', function(cb) {
  del(['public'], cb);
});

// ////////////////////////////////////////////////
// COPY
// ////////////////////////////////////////////////
gulp.task('copy', function() {
  var task;
  for (var i = 0; i < copyLocations.length; i++) {
    task = gulp.src(copyLocations[i].src)
    .pipe(plumber())
    .pipe(watch(copyLocations[i].src))
    .pipe(gulp.dest(copyLocations[i].dest))
    .pipe(connect.reload());
  }

  return task;
});

// ////////////////////////////////////////////////
// BROWSERIFY/WATCHIFY
// ////////////////////////////////////////////////
var bundler = browserify({
  basedir: './src/js/',
  entries: ['main.js'],
  debug: isDev
}).transform(ngHtml2Js({
  module: 'templates',
  extension: 'ngt'
  // baseDir: './src/js/components/navbar'
}));

gulp.task('js', function() {
  return bundler.bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulpif(isDev, sourcemaps.init({loadMaps: true})))
  .pipe(gulpif(isDev, sourcemaps.write('./')))
  .pipe(gulp.dest('./public/js'))
  .pipe(connect.reload());
});

gulp.task('watchify', function() {
  var watcher = watchify(bundler);
  return watcher
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .on('update', function() {
    watcher.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js'))
    .pipe(connect.reload());

    gutil.log('Updated Javascript sources');
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./public/js'));
});

// ////////////////////////////////////////////////
// LESS
// ////////////////////////////////////////////////
// Based on http://gotofritz.net/blog/geekery/how-to-prevent-less-errors-stopping-gulp-watch/
gulp.task('less', function() {
  var lessArgs = {
    paths: ['./src/less']
  };

  var src = gulp.src(watchLocations.less);

  if (isDev) {
    src = src.pipe(watch(watchLocations.less))
  }

  return src.pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(less(lessArgs))
  .on('error', onError)
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(destLocations.less))
  .pipe(connect.reload());
});

// ////////////////////////////////////////////////
// SERVER
// ////////////////////////////////////////////////
gulp.task('server', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

// ////////////////////////////////////////////////
// CONFIG TASKS
// ////////////////////////////////////////////////
gulp.task('config:dev', function() {
  // TODO add gulpif to dev-based tasks like sourcemaps
  isDev = true;
  return;
});

gulp.task('config:production', function() {
  isProduction = true;
  return;
});

// ////////////////////////////////////////////////
// MAIN TASKS
// ////////////////////////////////////////////////
gulp.task('default', ['less', 'js']);
gulp.task('dev', ['config:dev', 'copy', 'less', 'watchify', 'server']);
gulp.task('build', ['config:production', 'clean', 'copy', 'less']);
