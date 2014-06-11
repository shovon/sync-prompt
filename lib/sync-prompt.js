'use strict';

var _syncPrompt = require('../build/Release/sync_prompt');

var echoHidden = false;

function onExit() {
  if (echoHidden) {
    // This is just to clean up the part when the Node process is asked to exit
    // during the time when the operating system was instructed to not echo out
    // whatever is being typed to the console.
    _syncPrompt.setStdinEcho(true);
    echoHidden = false;
  }
}

process.on('SIGINT', onExit);
process.on('exit', onExit);
process.on('unhandledException', onExit);

module.exports.prompt = prompt;
function prompt(question, h) {
  // The `h` parameter has been deprecated.

  h = !!h;
  if (typeof question == "string") { process.stdout.write(question); }
  var retval = h ? hidden() : _syncPrompt.prompt();
  return retval;
}

module.exports.prompt.hidden = hidden;
function hidden(question) {
  if (typeof question == 'string') { process.stdout.write(question); }
  _syncPrompt.setStdinEcho(false);
  // Just a flag to ensure emergency clean-up, just in case.
  echoHidden = true;
  var value = prompt();
  console.log('');
  _syncPrompt.setStdinEcho(true);
  // Emergency clean-up not necessary, so set to false.
  echoHidden = false;
  return value;
}

module.exports.prompt.isEOF = function () {
  return _syncPrompt.isEOF();
};
