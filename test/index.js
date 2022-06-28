'use strict';

var expect = require('expect');
var fs = require('fs');
var http = require('http');

var CommonRegistry = require('../');
var DefaultRegistry = require('undertaker-registry');
var Undertaker = require('undertaker');

describe('CommonRegistry', function () {
  describe('constructor', function () {
    it('should be an instance of DefaultRegistry', function (done) {
      var registry = new CommonRegistry();
      expect(registry).toBeInstanceOf(DefaultRegistry);
      done();
    });

    it('should set default config if argument is not specified', function (done) {
      var registry = new CommonRegistry();
      expect(registry.config).toEqual({
        port: 8080,
        buildDir: './build',
      });
      done();
    });

    it('should set specified config', function (done) {
      var registry = new CommonRegistry({ port: 8081, buildDir: './foo' });
      expect(registry.config).toEqual({
        port: 8081,
        buildDir: './foo',
      });
      done();
    });
  });

  describe('init', function () {
    it('should throw an error if build dir already exist', function (done) {
      var existingDir = './test/existing-dir';
      try {
        fs.mkdirSync(existingDir);

        var taker = new Undertaker();
        var registry = new CommonRegistry({ buildDir: existingDir });
        expect(function () {
          registry.init(taker);
        }).toThrow(
          'Cannot initialize undertaker-common-tasks registry. ' +
            '`' +
            existingDir +
            '` directory exists.'
        );
        done();
      } finally {
        fs.rmdirSync(existingDir);
      }
    });

    it("contains working task: 'serve'", function (done) {
      var server;
      var origCreateServer = http.createServer;
      http.createServer = function (options, reqListener) {
        server = origCreateServer(options, reqListener);
        return server;
      };

      var buildDir = './test/build';

      var taker = new Undertaker();
      var registry = new CommonRegistry({ buildDir: buildDir });
      registry.init(taker);

      taker.task('serve')(function () {
        server.close(done);
      });
    });

    it("contains working task: 'clean'", function () {
      var buildDir = './test/build';

      var taker = new Undertaker();
      var registry = new CommonRegistry({ buildDir: buildDir });
      registry.init(taker);

      fs.mkdirSync(buildDir);
      return taker
        .task('clean')()
        .then(function () {
          expect(fs.existsSync(buildDir)).toEqual(false);
        });
    });
  });
});
