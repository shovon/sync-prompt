"use strict";

var _syncPrompt = require("../build/Release/sync_prompt");

module.exports.prompt = function (question) {
  if (typeof question == "string") { process.stdout.write(question); }
  return _syncPrompt.prompt();
};