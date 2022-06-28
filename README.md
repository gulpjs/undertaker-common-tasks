<p align="center">
  <a href="https://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# undertaker-common-tasks

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coveralls Status][coveralls-image]][coveralls-url]

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

- `port` - the port to start a static webserver on.
- `buildDir` - the output directory (clean deletes this directory).

## License

MIT

<!-- prettier-ignore-start -->

[downloads-image]: https://img.shields.io/npm/dm/undertaker-common-tasks.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/undertaker-common-tasks
[npm-image]: https://img.shields.io/npm/v/undertaker-common-tasks.svg?style=flat-square
[ci-url]: https://github.com/gulpjs/undertaker-common-tasks/actions?query=workflow:dev
[ci-image]: https://img.shields.io/github/workflow/status/gulpjs/undertaker-common-tasks/dev?style=flat-square
[coveralls-url]: https://coveralls.io/r/gulpjs/undertaker-common-tasks
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/undertaker-common-tasks.svg?style=flat-square

<!-- prettier-ignore-start -->
