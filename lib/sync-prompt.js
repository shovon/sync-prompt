'use strict';

var _syncPrompt = require('../build/Release/sync_prompt');

module.exports.prompt = function (question, hidden) {
  hidden = !!hidden;
  if (typeof question == "string") { process.stdout.write(question); }
  return hidden ? _syncPrompt.hiddenPrompt() : _syncPrompt.prompt();
};