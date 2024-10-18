const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDeleteOriginals = require('gulp-rev-delete-original');
const del = require('del');

// Paths
const paths = {
    scss: './src/scss/**/*.scss',
    css: './dist/css',
    js: './src/js/**/*.js',
    jsDist: './dist/js',
    jsLibs: {
        micromodal: './node_modules/micromodal/dist/micromodal.js',
    },
    images: './src/images/**/*',
    imagesDist: './dist/images',
    fonts: './src/fonts/**/*',
    fontsDist: './dist/fonts',
    html: './src/{*,.*}',
    htmlDist: './dist',
};

// Clean dist directory
gulp.task('clean', function () {
    return del(['./dist/**', '!./dist']);
});

// Copy images (binary mode)
gulp.task('images', function () {
    return gulp.src(paths.images, { encoding: false })
        .pipe(gulp.dest(paths.imagesDist));
});

// Copy fonts (binary mode)
gulp.task('fonts', function () {
    return gulp.src(paths.fonts, { encoding: false })
        .pipe(gulp.dest(paths.fontsDist));
});

// Copy index.html and other top-level files
gulp.task('html', function () {
    return gulp.src(paths.html, { encoding: false })
        .pipe(gulp.dest(paths.htmlDist));
});

// Compile SCSS to CSS, compress, and generate source maps
gulp.task('styles', function () {
    return gulp.src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css));
});

// Process JavaScript: concatenate, minify, and generate source maps
gulp.task('scripts', function () {
    return gulp.src(
        [
            paths.jsLibs.micromodal,
            paths.js
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.jsDist));
});

// Revision and thus cache-bust file names
gulp.task('revision', function () {
    return gulp.src(['./dist/css/*.css', './dist/js/*.js', './dist/**/*.{svg,png,ico}'], { base: './dist' })
        .pipe(rev())
        .pipe(revDeleteOriginals())
        .pipe(gulp.src('./dist/**/*.html'))
        .pipe(revRewrite())
        .pipe(gulp.dest('./dist'));
});

// Serve and watch SCSS/JS/HTML
gulp.task('serve', function() {
    browserSync.init({
        server: './dist/'
    });

    gulp.watch(paths.scss, gulp.series('styles')).on('change', browserSync.reload);
    gulp.watch(paths.js, gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch(paths.html, gulp.series('html')).on('change', browserSync.reload);
});

// Default task (run styles, scripts, and serve)
gulp.task('default', gulp.series('html', 'images', 'fonts', 'styles', 'scripts', 'serve'));

// Production deployment build task (without server)
gulp.task('build', gulp.series('clean', 'html', 'images', 'fonts', 'styles', 'scripts', 'revision'));
