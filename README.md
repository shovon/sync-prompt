# sync-prompt

[![Build Status](https://travis-ci.org/shovon/sync-prompt.png)](https://travis-ci.org/shovon/sync-prompt) [![Dependency Status](https://gemnasium.com/shovon/sync-prompt.png)](https://gemnasium.com/shovon/sync-prompt)

Synchronously prompt users for command-line input. Do more on Node.js, with less.

## Usage

Simply run `npm install sync-prompt`, and you should be good to go.

Example usage:

```javascript
var prompt = require('sync-prompt').prompt;

var name = prompt("What is your name? ");
// User enters "Mike".

console.log("Hello, " + name + "!");
// -> Hello, Mike!
```

## API

### `.prompt([question])`

When called, it will prompt the user for a command line input.

Optionally, you can pass in a string argument, and it will be displayed to the console. Note: unlike Node.js' `console.log`, the string will not end with a newline character.

## Running Tests

Be sure that you have the dependencies installed, locally, for the project:

```shell
npm install
```

And then run the tests:

```shell
npm test
```

## Licence

Unless stated in file headers, the license is found in the `LICENSE` file.