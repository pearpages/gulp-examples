(function () {
    var gulp = require('gulp');
    var args = require('yargs').argv;
    var browserSync = require('browser-sync');
    var config = require('./gulp.config')();
    var del = require('del');
    //I keep the comments as an example but they get loaded now with 'gulp-load-plugins'
    // var jshint = require('gulp-jshint'); //code correctness
    // var jscs = require('gulp-jscs'); //code structure
    // var util = require('gulp-util');
    // var gulpPrint = require('gulp-print'); //show all t he files we are 'touching' in the command line
    // var gulpif = require('gulp-if'); //for conditionals statements
    var $ = require('gulp-load-plugins')({lazy: true}); // load on demand al gulp plugins

    gulp.task('hello-world', function() {
        console.log('My first gulp task!');
    });

    gulp.task('vet', function() {
        log('Analyzing source with JSHint and JSCS');

        //all the source code + the root js files
        gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
        .pipe($.jshint.reporter('fail'));
    });

    gulp.task('styles', ['clean-styles'], function() {
        //clean-styles, as a dependency, runs b4 styles @ see clean-styles task
        log('Compliling Less --> CSS');

        return gulp
        .src(config.less)
            .pipe($.plumber()) //plumber deals with errors and stops execusion
            .pipe($.less())
            //.on('error', errorLogger) // not longer uesd, bc we use plumber
            .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
            .pipe(gulp.dest(config.temp));
        });

    gulp.task('clean-styles', function(done) { //we create a callback done to make sure we clean-styles first
        var files = config.temp + '**/*.css';
        clean(files, done);
    });

    gulp.task('less-watcher', function() {
        gulp.watch([config.less], ['styles']);
    });

    gulp.task('wiredep', function() {
        var options = config.getWiredepDefaultOptions();
        var wiredep = require('wiredep').stream; //.stream is to use it with gulp

        return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
    });

    gulp.task('serve-dev', ['inject'], function() {
        var isDev = true;

        var nodeOptions = {
            script: config.nodeServer,
            delayTime: 1,
            env: {
                'PORT': port,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [config.server]
        };

        return $.nodemon(nodeOptions)
        .on('restart', function() {
            setTimeout(function() {
                browserSync.notify('reloading noew...');
                browserSyng.reload({stream:false});
            }, config.browserRelodDelay);
        })
        .on('start', function() {
            log('*** nodemon started ***');
            startBrowserSync();
        })
        .on('crash', function() {
                //
            })
        .on('exit', function() {
                //
            });
    });

    gulp.task('less-watcher', function() {
        gulp.watch([config.less], ['styles']);
    });

    /* Helpers */

    // Not loger used bc we use plumber
    // function errorLogger(error) {
    //     // we've defined the log function which uses gulp-util.log
    //     log('*** Start of Error ***');
    //     log(error);
    //     log('*** End of Error ***');
    //     this.emit('end'); //ends the pipe
    // }

    function changeEvent(event) {
        var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

    function clean (path) {
        log('Cleaning: ' + $.util.colors.blue(path));
        del(path, done); //node package
    }

    function log(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    }

    function startBrowserSync() {
        if (args.nosync || browserSync.active) {
            return;
        }

        log('Starting browser-sync on port ' + port);

        gulp.watch([config.less], ['styles'])
            .on('change', function(event) {
                changeEvent(event);
            });

        var options = {
            proxy: 'localhost' + port,
            port: 3000,
            files: [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.cs'
            ],
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            notify: true,
            reloadDelay: 1000
        };
    }
}());