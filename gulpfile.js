var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    htmlreplace = require('gulp-html-replace');

gulp.task('build-js', (done) => {    
    gulp.src('src/js/site.js')
        .pipe(uglify({mangle: { toplevel: true }}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(size({
            title: 'size of custom js'
        }))
        .pipe(gulp.dest('app/js'));
    
    gulp.src('src/lib/*.js')
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(size({
            title: 'size of lib js'
        }))
        .pipe(gulp.dest('app/js'));
    done();
});

gulp.task('build-css', (done) => {
    gulp.src('src/css/site.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCss())
        .pipe(gulp.dest('app/css'));

    gulp.src('src/lib/*.css')
        .pipe(concat('lib.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('app/css'));
    done();
});

gulp.task('copyfonts', (done) => {
    gulp.src('src/webfonts/*.*')
        .pipe(gulp.dest('app/webfonts'));
    done();
});

gulp.task('copyimages', (done) => {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('app/images'));

    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('app'));
    done();
});

gulp.task('build-html', (done) => {
    gulp.src('src/index.html')
        .pipe(htmlreplace({
            'css': ['css/lib.min.css', 'css/site.min.css'],
            'js': ['js/lib.min.js', 'js/site.min.js']
        }))
        .pipe(gulp.dest('app'));
    done();
})

gulp.task('clean', () => {
    return gulp.src(['app'], { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('default', gulp.series('clean', 'build-js', 'build-css', 'build-html', 'copyfonts', 'copyimages'));