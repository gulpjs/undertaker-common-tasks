<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# undertaker-common-tasks

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Gitter chat][gitter-image]][gitter-url]

Proof-of-concept custom registry that pre-defines tasks.

## Example

```js
var gulp = require('gulp');
var CommonTasks = require('undertaker-common-tasks');

gulp.registry(new CommonTasks({ port: 1337, buildDir: './dist' }));

// 'clean' & 'series' were defined by the registry
gulp.task('default', gulp.series('clean', 'serve'));
```

## API

### CommonTasksRegistry([options])

Constructor for the registry. Pass an instance of this registry to `gulp.registry`.

#### options

* `port` - the port to start a static webserver on.
* `buildDir` - the output directory (clean deletes this directory).

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/undertaker-common-tasks.svg
[npm-url]: https://npmjs.org/package/undertaker-common-tasks
[npm-image]: http://img.shields.io/npm/v/undertaker-common-tasks.svg

[travis-url]: https://travis-ci.org/gulpjs/undertaker-common-tasks
[travis-image]: http://img.shields.io/travis/gulpjs/undertaker-common-tasks.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
