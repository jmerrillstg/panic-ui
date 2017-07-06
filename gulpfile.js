/* File: gulpfile.js */

// grab our gulp packages
const gulp  = require('gulp'),
    eslint = require('gulp-eslint'),
	watch = require('gulp-watch'),
	del = require('del'),
	browserSync = require('browser-sync'),
	babel = require('gulp-babel'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	vinylSource = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	concat = require('gulp-concat'),
	add = require('gulp-add-src'),
	util = require('gulp-util'),
	sass = require('gulp-sass'),
	rename= require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin= require('gulp-imagemin'),
	reload = browserSync.reload,
	source = 'source',
	dest = 'public',
    ngConfig = require('gulp-ng-config');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// clean task
gulp.task('clean', function() {
	return del(dest+'/**')
});

// build dev task
gulp.task('buildDev', ['html', 'css', 'images', 'js', 'libs', 'dev']);

// build prod task
gulp.task('buildProd', ['html', 'css', 'images', 'js', 'libs', 'prod']);

// dev task
gulp.task('dev', function () {
    gulp.src('./config.json')
    .pipe(ngConfig('panicUi.config', {
        environment: 'dev'
    }))
    .pipe(gulp.dest(dest+'/js/'));
});

// dev task
gulp.task('prod', function () {
    gulp.src('./config.json')
    .pipe(ngConfig('panicUi.config', {
        environment: 'prod'
    }))
    .pipe(gulp.dest(dest+'/js/'));
});

// html task
gulp.task('html', function() {
	return gulp.src(source+'/**/*.html', {base: source}).pipe(gulp.dest(dest));
});

// css task
gulp.task('css', function() {
	const onError = function (err) {
		const message = errorMsgr(err);
		throw new util.PluginError('SASS', { message });
	};

	return gulp.src(source+'/css/styles.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			onError
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(rename('styles.css'))
		.pipe(gulp.dest(dest+'/css'));
});

// images task
gulp.task('images', function() {
	return gulp.src(source+'/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(dest+'/images'));
});

// js task
gulp.task('js', function() {
	const bundler = browserify({ debug: true });

	bundler.transform(babelify);
	bundler.add(source+'/js/scripts.js');

	return bundler.bundle()
		.on('error', util.log)
		.pipe(vinylSource(source+'/js/scripts.js'))
		.pipe(buffer())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(dest+'/js/'));
});

// libs task
gulp.task('libs', function() {
	return gulp.src('lib/**/*').pipe(gulp.dest(dest+'/lib'));
});

// eslint task
gulp.task('eslint', function() {
    return gulp.src([source+'/**/*.js', '!'+source+'/assets/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// watch task
gulp.task('watch', function() {
	browserSync.init({
		proxy: 'localhost.panic'
	});
    gulp.watch(source+['/**/*.js'], ['eslint', 'js', reload]);
	gulp.watch(source+'/**/*.html', ['html', reload]);
	gulp.watch(source+'/**/*.scss', ['css', reload]);
	gulp.watch(source+'/images/**/*', ['images', reload]);
});