'use strict';
// TODO: Break out base URLs into vars
// TODO: Make paths absolute to the project dir

var browserify = require('browserify'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    gulpPrint = require('gulp-print'),
    del = require('del'),
    babel = require('gulp-babel');

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/js-gallery-fixed.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('js-gallery-fixed.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(babel())
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function(){
    return gulp.src('./src/js-gallery-fixed.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(minify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('assets', ['clean-assets'], function(){
    return gulp.src([
        './src/index.html',
        './src/assets/**/*'
    ], { base: './src'})
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean-assets', function(){
    del('./dist/assets/**/*').then(paths => {
        console.log('Cleaned the assets folder');
    });
});

gulp.task('clean', ['clean-assets'], function(){
    console.log('Cleaned project');
});

gulp.task('build', ['js', 'sass', 'assets'], function(){
    return console.log('Resources built...');
});

gulp.task('watch', ['build'], function(){
    let watchOptions = {
        events: ['add', 'change', 'unlink'],
        read: false
    }

    watch('./src/**/*.js', watchOptions, function(){
        gulp.start('js');
    });

    watch([
        './src/**/*.scss',
        './src/**/*.css'
    ],
    watchOptions,
    function(){
        gulp.start('sass');
    });

    watch([
        './src/index.html',
        './src/assets/*'
    ],
    watchOptions,
    function(){
        gulp.start('assets');
    });
})
