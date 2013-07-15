/* globals describe, it, beforeEach, afterEach */

"use strict";

var _syncPrompt = require("./build/Release/sync_prompt")
  , prompt = require("./lib/sync-prompt").prompt
  , sinon = require("sinon")
  , assert = require("assert")
  ;

describe("syncPrompt.prompt", function () {
  beforeEach(function () {
    sinon.stub(process.stdout, "write");
    sinon.stub(_syncPrompt, "prompt");
  });

  afterEach(function () {
    process.stdout.write.restore();
    _syncPrompt.prompt.restore();
  });

  describe("without arguments", function () {
    it("should not display anything", function () {
      prompt();
      assert(!process.stdout.write.called);
      assert(_syncPrompt.prompt.called);
    });
  });

  describe("with arguments", function () {
    it("should display something, given", function () {
      var question = "What is your name? ";
      prompt(question);
      assert(process.stdout.write.calledWith(question));
      assert(_syncPrompt.prompt.called);
    });
  });
});