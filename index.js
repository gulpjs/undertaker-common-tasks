'use strict';

var fs = require('fs');
var http = require('http');
var util = require('util');

var del = require('del');
var logger = require('gulplog');
var ecstatic = require('ecstatic');
var DefaultRegistry = require('undertaker-registry');

function CommonRegistry(opts) {
  DefaultRegistry.call(this);

  opts = opts || {};

  this.config = {
    port: opts.port || 8080,
    buildDir: opts.buildDir || './build',
  };
}

util.inherits(CommonRegistry, DefaultRegistry);

CommonRegistry.prototype.init = function init(taker) {
  var port = this.config.port;
  var buildDir = this.config.buildDir;
  var exists = fs.existsSync(buildDir);

  if (exists) {
    throw new Error('Cannot initialize undertaker-common-tasks registry. `' +
      buildDir + '` directory exists.');
  }

  taker.task('clean', function() {
    return del([buildDir]);
  });

  taker.task('serve', function(cb) {
    http.createServer(
      ecstatic({ root: buildDir })
    ).listen(port, function() {
      logger.info('Server started at http://0.0.0.0:' + port);
      cb();
    });
  });
};

module.exports = CommonRegistry;
