"use strict";

var assert = require("node:assert");
var { describe, it } = require("node:test");
var fs = require("node:fs");
var http = require("node:http");

var CommonRegistry = require("../");
var DefaultRegistry = require("undertaker-registry");

// Just fake an Undertaker
function Undertaker() {
  this.tasks = {};
}
Undertaker.prototype.task = function (name, fn) {
  if (!fn) {
    return this.tasks[name];
  } else {
    this.tasks[name] = fn;
  }
};

describe("CommonRegistry", function () {
  describe("constructor", function () {
    it("should be an instance of DefaultRegistry", function () {
      var registry = new CommonRegistry();
      assert.ok(registry instanceof DefaultRegistry);
    });

    it("should set default config if argument is not specified", function () {
      var registry = new CommonRegistry();
      assert.deepStrictEqual(registry.config, {
        port: 8080,
        buildDir: "./build",
      });
    });

    it("should set specified config", function () {
      var registry = new CommonRegistry({ port: 8081, buildDir: "./foo" });
      assert.deepStrictEqual(registry.config, {
        port: 8081,
        buildDir: "./foo",
      });
    });
  });

  describe("init", function () {
    it("should throw an error if build dir already exist", function () {
      var existingDir = "./test/existing-dir";
      try {
        fs.mkdirSync(existingDir);

        var taker = new Undertaker();
        var registry = new CommonRegistry({ buildDir: existingDir });
        const msg =
          "Cannot initialize undertaker-common-tasks registry. " +
          "`" +
          existingDir +
          "` directory exists.";
        assert.throws(() => registry.init(taker), { message: msg });
      } finally {
        fs.rmdirSync(existingDir);
      }
    });

    it("contains working task: 'serve'", function (t, done) {
      var server;
      var origCreateServer = http.createServer;
      http.createServer = function (options, reqListener) {
        server = origCreateServer(options, reqListener);
        return server;
      };

      var buildDir = "./test/build";

      var taker = new Undertaker();
      var registry = new CommonRegistry({ buildDir: buildDir });
      registry.init(taker);

      taker.task("serve")(function () {
        server.close(done);
      });
    });

    it("contains working task: 'clean'", function () {
      var buildDir = "./test/build";

      var taker = new Undertaker();
      var registry = new CommonRegistry({ buildDir: buildDir });
      registry.init(taker);

      fs.mkdirSync(buildDir);
      return taker
        .task("clean")()
        .then(function () {
          assert.strictEqual(fs.existsSync(buildDir), false);
        });
    });
  });
});
