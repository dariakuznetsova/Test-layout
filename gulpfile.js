var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rigger = require('gulp-rigger'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith'),
    rimraf = require('rimraf'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    iconify = require('gulp-iconify'),
    reload = browserSync.reload;


// Сервер
gulp.task ('server', function () {
    browserSync ({
        port: 9000,
        server: {
            baseDir: 'site'
        }
    });
});


// Jade
gulp.task('jade', function () {
    gulp.src('jade/*.jade')
        .pipe(jade({
            pretty: '\t',
        }))
        .pipe(gulp.dest('site'))
});

//iconify
gulp.task('default', function() {
    iconify({
        src: 'site/images/icons/*.svg',
        pngOutput: './img/icons/png',
        scssOutput: './scss',
        cssOutput:  './css',
        styleTemplate: '_icon_gen.scss.mustache',
        defaultWidth: '300px',
        defaultHeight: '200px',
        svgoOptions: {
            enabled: true,
            options: {
                plugins: [
                    { removeUnknownsAndDefaults: false },
                    { mergePaths: false }
                ]
            }
        },
        svg2pngOptions: {
            scaling: 1.0,
            verbose: true,
            concurrency: null
        }
    });
});

// Sprites
gulp.task('sprite', function () {
    var spriteData = gulp.src('sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: 'site/images/sprite.png',
        cssName: '_sprite.scss',
        algorithm: 'alt-diagonal',
        padding: 40
    }));
    spriteData.img.pipe(gulp.dest('./site/images/sprites/'));
    spriteData.css.pipe(gulp.dest('./style/'));
});


// Слежка
gulp.task ('watch', function () {
        gulp.watch ([
        'site/*.html',
        'site/js/**/*.js',
        'site/css/*.css'
        ]).on ('change', browserSync.reload);
        gulp.watch ('jade/*.jade', ['jade']);          
});


// Задача по умолчанию
gulp.task ('default', ['server', 'watch']);
