'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var htmlLint = require('gulp-html-lint');
var sassLint = require('gulp-sass-lint');
/**
 * Server connect
 */

gulp.task('connect', function () {
    connect.server({
        root: '.',
        port: 1111,
        livereload: true
    });
});
/**
 * Css
 */
gulp.task('css', function () {
    gulp.src('css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(connect.reload());
});

/**
 * JavaScript
 */
gulp.task('js', function () {
    gulp.src('scripts/*js')
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

/**
 * Watch
 */
gulp.task('watch', function () {
    gulp.watch(['css/*css'], ['css']);
    gulp.watch(['css/*scss'], ['css']);
    gulp.watch(['*html'], ['html']);
    gulp.watch(['scripts/*js'], ['js']);
});

const sassLintOptions = {
    rules: {
        'no-important': 0,
        'nesting-depth': 0,
        'property-sort-order': 0,
        'clean-import-paths': 0
    }
};

const htmlLintOptions = {
    rules: {
        'class-style': false,
        'id-class-style': false,
        'attr-req-value': false,
        'attr-name-style': false,
        'attr-bans': [
            'align', 'background', 'bgcolor', 'border', 'frameborder',
            'longdesc', 'marginwidth', 'marginheight', 'scrolling', 'width'
        ]
    }
};

/**
 * Lint for SASS files.
 */
gulp.task('sass-lint', function () {
    return gulp.src('css/*.scss')
        .pipe(sassLint(sassLintOptions))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

/**
 * Lint for HTML files.
 */
gulp.task('html-lint', function () {
    return gulp.src('*.html')
        .pipe(htmlLint(htmlLintOptions))
        .pipe(htmlLint.format())
        .pipe(htmlLint.failOnError());
});

/**
 * Default
 */
gulp.task('default', [
    'connect',
    'html',
    'css',
    'js',
    'watch'
]);

gulp.task('lint', ['sass-lint', 'html-lint']);