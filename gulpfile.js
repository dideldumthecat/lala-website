const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
    scss: './src/scss/**/*.scss',
    css: './dist/css',
    images: './src/images/**/*',
    fonts: './src/fonts/**/*',
    distImages: './dist/images',
    distFonts: './dist/fonts',
    html: './*.html'
};

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

// Task to copy images
gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distImages));
});

// Task to copy fonts
gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.distFonts));
});

// Watch SCSS, images, fonts, and HTML files for changes
gulp.task('watch', function () {
    gulp.watch(paths.scss, gulp.series('styles'));
    gulp.watch(paths.images, gulp.series('images'));
    gulp.watch(paths.fonts, gulp.series('fonts'));
});

// Serve and watch SCSS/CSS, images, fonts, and HTML for changes
gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });

    gulp.watch(paths.scss, gulp.series('styles')).on('change', browserSync.reload);
    gulp.watch(paths.images, gulp.series('images')).on('change', browserSync.reload);
    gulp.watch(paths.fonts, gulp.series('fonts')).on('change', browserSync.reload);
    gulp.watch(paths.html).on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('styles', 'images', 'fonts', 'serve'));
