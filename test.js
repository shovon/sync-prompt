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
    sinon.stub(_syncPrompt, 'hiddenPrompt');
  });

  afterEach(function () {
    process.stdout.write.restore();
    _syncPrompt.prompt.restore();
    _syncPrompt.hiddenPrompt.restore();
  });

  describe('without arguments', function () {
    it('should not display anything', function () {
      prompt();
      assert(!process.stdout.write.called);
      assert(_syncPrompt.prompt.called);
      assert(!_syncPrompt.hiddenPrompt.called);
    });
  });

  describe('with arguments', function () {
    it('should display something, given a string', function () {
      var question = 'What is your name? ';
      prompt(question);
      assert(process.stdout.write.calledWith(question));
      assert(_syncPrompt.prompt.called);
      assert(!_syncPrompt.hiddenPrompt.called);
    });

    it('should display something, even given an empty string', function () {
      var empty = '';
      prompt(empty);
      assert(process.stdout.write.calledWith(empty));
      assert(_syncPrompt.prompt.called);
      assert(!_syncPrompt.hiddenPrompt.called);
    });

    it('should not display something, given a non-string', function () {
      // It's truthy, but not a string.
      prompt(true);
      assert(!process.stdout.write.called);
      assert(_syncPrompt.prompt.called);
      assert(!_syncPrompt.hiddenPrompt.called);
    });

    it('should have disabled stdout, given true as the last parameter', function () {
      var question = 'What is your name? ';
      prompt(question, true);
      assert(process.stdout.write.calledWith(question));
      assert(!_syncPrompt.prompt.called);
      assert(_syncPrompt.hiddenPrompt.called);
    });
  });
});