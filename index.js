'use strict';

var fs = require('fs');
var http = require('http');
var util = require('util');

var del = require('del');
var gutil = require('gulp-util');
var ecstatic = require('ecstatic');
var DefaultRegistry = require('undertaker-registry');

function CommonRegistry(){
  DefaultRegistry.call(this);

  var port = 8080;
  var buildDir = './build';
  var exists = fs.existsSync(buildDir);

  if(exists){
    throw new Error('Cannot initialize undertaker-common-tasks registry. `build/` directory exists.');
  }

  this.set('clean', function(cb){
    del([buildDir], cb);
  });

  this.set('serve', function(cb){
    http.createServer(
      ecstatic({ root: buildDir })
    ).listen(port, function(){
      gutil.log('Server started at http://0.0.0.0:' + port);
      cb();
    });
  });
}

util.inherits(CommonRegistry, DefaultRegistry);

module.exports = CommonRegistry;
