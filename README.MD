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

* wiredep
* gulp-inject

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
``
