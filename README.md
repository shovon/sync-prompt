# sync-prompt

Synchronously prompt users for command-line input. Do more on Node.js, with less.

## Usage

Simply run `npm install sync-prompt`, and you should be good to go.

```javascript
var syncPrompt = require('sync-prompt');

process.stdout.write("What is your name? ");

var name = syncPrompt.prompt();
// User enters "Mike".

console.log("Hello, " + name + "!");
// -> Hello, Mike!
```

## Licence

Unless stated in file headers, the license is stated in the `LICENSE` file.