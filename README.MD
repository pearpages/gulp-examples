# gulp-examples

## Why Gulp?

### Characteristics

* Code over configuration
* Stream based
* 1100+ plugins
* Use node more readily

### Gulp Streams

* Minification
* Concatenation
* Vendor prefxies
* Less to CSS compilation
* Optimizing 3rd party and custom code
* Injecting files into HTML
* File revisions and versioning
* Caching Angular templates
* Testing
* Code analysis

### More Efficiency

* Continous Integration
* Testing
* Development

### Automate Tasks

* Code Quality
* Tests
* Build Pipeline

Therefore:

* Improve quality
* Deliver Faster
* Repeatable and Consistent

### Automated Pipeline

Develop > Analyze > Test > Build > Deploy

## Gulp Passes Files Through a Stream

* Start with a source set of files
* Process or examine the files
* Send output to a desitnation

## Gulp APIS

1. gulp.task
2. gulp.src
3. gulp.dest
4. gulp.watch

## Libaries

* JSHint (Detect errors and potential problems)
* JSCS (Code Style Checker: enforcing your style guide)

For these two we use **.jshintrc** and **.jscrc**

## Examples

```javascript
gulp.task('styles', funciton() {
    log('Compiling Less --> CSS'); //self made function

    return gulp
    .src(config.less) //in gulp.config.js
    .pipe($.plumber()) //errors
    .pipe($.less())
    .pipe($.autoprefixer({
        browsers: ['last 2 version', '> 5%']
    }))
    .pipe(gulp.dest(config.temp)) //in gulp.config.js

    });
```

## HTML Injection

* wiredep: Gather the bower files and inject into HTML
* gulp-inject: Inject CSS into HTML
* post install script: Run wiredep after bower install

```bash
npm install wirdep gulp-inject --save-dev
```

```html
<!DOCTYPE html>
<html>
<head>
<!-- bower:css -->
<!-- endbower -->

<!-- inject:css -->
<!-- endinject -->
    <title></title>
</head>
<body>
    <!-- bower:js -->
    <!-- endbower -->

    <!-- inject:js -->
    <!-- endinject -->
</body>
</html>
```

```javascript
gulp.task('wiredep', function() {
    log('Wiring the bower dependencies into the html'); //self made function

    var wiredep = require('wiredep').steam;
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});
```

```javascript
gulp.task('inject', ['wiredep', 'styles'], function() {
    log('Wire up css into the html, after files are ready');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
    });
```

**.bowerrc**
```
{
    "directory": "bower_components",
    "scripts": {
        "postinstall": "gulp wiredep"
    }
}
```

## Serve-dev

```javascript
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
                //
            })
            .on('start', function() {
                //
            })
            .on('crash', function() {
                //
            })
            .on('exit', function() {
                //
            });
    });
```