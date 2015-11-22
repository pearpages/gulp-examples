(function () {
    var gulp = require('gulp');
    var args = require('yargs').argv;
    var config = require('./gulp.config')();
    var $ = require('gulp-load-plugins')({lazy: true}); // load on demand al gulp plugins

    // var jshint = require('gulp-jshint'); //code correctness
    // var jscs = require('gulp-jscs'); //code structure
    // var util = require('gulp-util');
    // var gulpPrint = require('gulp-print'); //show all t he files we are 'touching' in the command line
    // var gulpif = require('gulp-if'); //for conditionals statements

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

    /* Helpers */

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
}());