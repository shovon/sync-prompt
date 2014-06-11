# sync-prompt

**The missing prompt function for Node.js**

[![Build Status](https://travis-ci.org/shovon/sync-prompt.png)](https://travis-ci.org/shovon/sync-prompt) [![Dependency Status](https://gemnasium.com/shovon/sync-prompt.png)](https://gemnasium.com/shovon/sync-prompt) [![Coverage Status](https://coveralls.io/repos/shovon/sync-prompt/badge.png)](https://coveralls.io/r/shovon/sync-prompt) [![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=shovon&url=https://github.com/shovon/sync-prompt&title=Synchronous%20Prompt%20for%20Node.js&language=English&tags=github&category=software)

You know how the browser has the `prompt` function that *actually* returns what the user entered, and not just require that you grab the value via a callback? Welp, Node.js doesn't have one, until now! Just like in the browser, call `prompt` and you should be able to prompt users via the command line! No callback hell!

## Usage

Simply run `npm install sync-prompt`, and you should be good to go.

Example usage:

```javascript
var prompt = require('sync-prompt').prompt;

var name = prompt('What is your name? ');
// User enters "Mike".

console.log('Hello, ' + name + '!');
// -> Hello, Mike!

var password = prompt.hidden('Password: ');
// User enters a password, but nothing will be written to the screen.
```

## API

### `.prompt([question [, hidden = false]])`

When called, it will prompt the user for a command-line input.

#### Parameters

**question**

Type: `string`. Default value: undefined. Optional

When set to a string, the value of `question` will be outputed to the console.

**hidden** Deprecated

Type: `boolean`. Default value: undefined. Optional, but requires `question` to be set to a string.

**Please consider avoiding the use of `.prompt('some qustion', true)` for hiding what the user types. Instead, consider using the more descriptive, and--what many would argue--self-documenting `.prompt.hidden('some question')`. The former is deprecated, and will be removed in a future release. The latter makes more sense when you want to implement hidden prompts :).**

When set to true, none of the user's input will be written to the console. This is great for passwords.

### `.prompt.hidden([question])`

When called, it will prompt the user for a command-line input, while whatever is typed will not be echoed out to the screen.

#### Parameters

**question**

Type `string`. Default value: undefined. Optional

When set to a string, the value of `question` will be outputed to the console.

### `.prompt.isEOF()`

Returns true if the console input (stdlib's cin) has reached EOF. False otherwise.

## Running Tests

Be sure that you have the dependencies installed, locally, for the project:

```shell
npm install
```

And then run the tests:

```shell
npm test
```

### Code Coverage

You can run

```shell
npm run coverage
```

And see a summary of the code coverage on the command line.

You can get an in-depth coverage report in the generated `coverage/lcov-report/index.html` file.

## Licence

Unless stated in file headers, the license is found in the `LICENSE` file.