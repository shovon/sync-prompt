// Unfortunately, there isn't much of a way to automatically test sync-prompt.
// Hence, just stress test it and see if it works.

var syncPrompt = require('./build/Release/sync_prompt');

process.stdout.write("What is your name? ")
console.log("Hello, " + syncPrompt.prompt() + "!");
