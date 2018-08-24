var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var $$ = require('gulp-load-plugins')();
var reload = browserSync.reload;

// Handle CLI errors

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Folders

var devFolder = 'src/';
var buildFolder = 'build/';

var devSubFolder = {
  sass : devFolder + 'theme/',
  js   : devFolder + 'scripts/',
  img  : devFolder + 'assets/'
};

var distFolder = {
  css  : buildFolder + 'css/',
  js   : buildFolder + 'js/',
  img  : buildFolder + 'assets/'
};

// Styles

gulp.task('styles', function() {
  return gulp.src(devSubFolder.sass + '**/*.scss')
  .pipe($$.sass())
  .on('error', $$.notify.onError("Error: <%= error.message %>"))
  .on('error', handleError)
  .pipe($$.autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest(distFolder.css))
  .pipe($$.minifyCss({keepSpecialComments: 1}))
  .pipe(gulp.dest(distFolder.css))
  .pipe(reload({ stream:true }));
});

// Scripts

gulp.task('scripts', function() {
  return browserify({
    basedir: '.',
    debug: true,
    entries: [devSubFolder.js+'main.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts']
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(gulp.dest(distFolder.js))
  .pipe(reload({ stream:true }));
});

// Images

gulp.task('images', function() {
  return gulp.src(devSubFolder.img + '**/*')
  .pipe(gulp.dest(distFolder.img))
	.pipe(reload({ stream:true }));
});

// Html

gulp.task('pages', function() {
  return gulp.src(devFolder + '**/*.html')
  .pipe(gulp.dest(buildFolder))
	.pipe(reload({ stream:true }));
});

// JSHint

gulp.task('jshint', function() {
  return gulp.src(devFolder.js + '**/*.js')
  .pipe($$.jshint({
    browser: true,
    curly: true,
    eqeqeq: true,
    eqnull: true,
    esnext: true,
    latedef: true,
    noarg: true,
    undef: true,
    unused: true
  }))
  .pipe($$.jshint.reporter('default'))
});

gulp.task('serve', ['styles', 'scripts', 'images', 'pages'], function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });

  gulp.watch(devSubFolder.sass + '**/*.scss', ['styles'], reload);
  gulp.watch(devSubFolder.js + '**/*.js', ['scripts'], reload);
  gulp.watch(devSubFolder.img + '**/*', ['images'], reload);
  gulp.watch(devFolder + '**/*.html', ['pages'], reload);
});

gulp.task('default', ['styles', 'scripts', 'images', 'pages']);