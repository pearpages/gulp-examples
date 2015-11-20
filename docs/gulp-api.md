# Gulp Api

## gulp.task

Registers a task name with a function and optionally declare dependencies.

In the next example *jshint* and *jscs* both run first, then task js runs.

Dependency tasks run in **parallel**, not in sequence!

```jasvascript
gulp.task('js', ['jscs','jshint'] function() {
	return gulp
	.src('./src/**/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./build/'));
});
```

### Most Common Tasks

* Test and Lint Code
* Optimize Files
* Serve Your App

## gulp.src

