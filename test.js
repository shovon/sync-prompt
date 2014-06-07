/* globals describe, it, beforeEach, afterEach */

'use strict';

var _syncPrompt = require('./build/Release/sync_prompt');
var prompt = require('./lib/sync-prompt').prompt;
var sinon = require('sinon');
var assert = require('assert');

describe('syncPrompt.prompt', function () {
  beforeEach(function () {
    sinon.stub(process.stdout, 'write');
    sinon.stub(_syncPrompt, 'prompt');
    sinon.stub(_syncPrompt, 'setStdinEcho');
  });

  afterEach(function () {
    process.stdout.write.restore();
    _syncPrompt.prompt.restore();
    _syncPrompt.setStdinEcho.restore();
  });

  describe('without arguments', function () {
    it('should not display anything', function () {
      prompt();
      assert(!process.stdout.write.called);
      assert(_syncPrompt.prompt.called);
      assert(!_syncPrompt.setStdinEcho.called);
    });
  });

  describe('with arguments', function () {
    it('should display something, given a string', function () {
      var question = 'What is your name? ';
      prompt(question);
      assert(process.stdout.write.calledWith(question));
      assert(_syncPrompt.prompt.called);
      assert(!_syncPrompt.setStdinEcho.called);
    });

    it('should display something, even given an empty string', function () {
      var empty = '';
      prompt(empty);
      assert(process.stdout.write.calledWith(empty));
      assert(_syncPrompt.prompt.called);
      assert(!_syncPrompt.setStdinEcho.called);
    });

    it('should not display something, given a non-string', function () {
      // It's truthy, but not a string.
      prompt.hidden();
      assert(process.stdout.write.calledOnce);
      assert(_syncPrompt.prompt.called);
      assert(_syncPrompt.setStdinEcho.firstCall.calledWith(false));
      assert(_syncPrompt.setStdinEcho.secondCall.calledWith(true));
    });

    it('should have disabled stdout, given true as the last parameter', function () {
      var question = 'What is your name? ';
      prompt.hidden(question);
      assert(process.stdout.write.calledWith(question));
      assert(_syncPrompt.prompt.called);
      assert(_syncPrompt.setStdinEcho.firstCall.calledWith(false));
      assert(_syncPrompt.setStdinEcho.secondCall.calledWith(true));
    });
  });
});