# Gulp Apis

* gulp.task (Define a task)
* gulp.src (Read files)
* gulp.dest (Write the files)
* gulp.watch (Watch the files)

## gulp.task(name [,dependencies], fn)

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

## gulp.src(glob[,options])

* Takes a file system glob (set of files)
* Emites files that match
* Optionally specify options to apply to the glob

```javascript
gulp.src('./src/**/*.js');
```

## gulp.dest(folder [,options])

```javascript
gulp.dest('./build/');
```

### When

* Write Files
* Write to destination different from source
* Write to same file or new file

## gulp.watch(glob [,options], tasks)

Run one or more tasks when a file mathed by the *glob* changes. 

The tasks can be 

* an array of task names
* a callback function with an event objec {type: ..., path: ...}

```javascript
gulp.watch('./src/**/*.js', ['jshint', 'jscs']);
```

```javascript
gulp.watch('./src/**/*.less', function(event) {
	console.log('watched event ' + event.type + ' for ' + event.path);
});
```

## All Together

```javascript
gulp.task('js', function() {
	return gulp
		.src('./src/**/*.js')
		.pipe(jshint())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'));
});
```