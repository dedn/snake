let gulp = require('gulp');
let sass = require('gulp-sass');
let livereload = require('gulp-livereload');
let connect = require('gulp-connect');
let autoprefixer = require('gulp-autoprefixer');
let htmlLint = require('gulp-html-lint');
let sassLint = require('gulp-sass-lint');
let babel = require('gulp-babel');
let jslint = require('gulp-jslint');
let jshint = require('gulp-jshint');

/**
 * Server connect
 */
gulp.task('connect', () => {
  connect.server({
    root: '.',
    port: 8000,
    livereload: true
  });
});

/**
 * Css
 */
gulp.task('css', () => {
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
gulp.task('js', () => {
  gulp.src('scripts/*js')
    .pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src('*.html')
    .pipe(connect.reload());
});

/**
 * Watch
 */
gulp.task('watch', () => {
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
    'attr-name-style': false
  }
};

/**
 * Lint for SASS files.
 */
gulp.task('sass-lint', () => {
  return gulp.src('css/*.scss')
    .pipe(sassLint(sassLintOptions))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/**
 * Lint for HTML files.
 */
gulp.task('html-lint', () => {
  return gulp.src('*.html')
    .pipe(htmlLint(htmlLintOptions))
    .pipe(htmlLint.format())
    .pipe(htmlLint.failOnError());
});

/**
 * Lint for JS files.
 */
gulp.task('jslint', () => {
  return gulp.src('scripts/*.js')
    .pipe(jshint({
      "esversion": 6
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Babel
 */
gulp.task('babel', () => {
  return gulp.src('scripts/*.js')
    .pipe(babel({
      presets: [
        ['es2015', {modules: false}]
      ]
    }))
    .pipe(gulp.dest('app'));
});

/**
 * Default
 */
gulp.task('default', [
  'connect',
  'html',
  'css',
  'js',
  'watch',
  'babel'
]);

gulp.task('lint', ['sass-lint', 'html-lint', 'jslint']);