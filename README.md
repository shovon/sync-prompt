# sync-prompt

[![Build Status](https://travis-ci.org/shovon/sync-prompt.png)](https://travis-ci.org/shovon/sync-prompt) [![Dependency Status](https://gemnasium.com/shovon/sync-prompt.png)](https://gemnasium.com/shovon/sync-prompt) [![Coverage Status](https://coveralls.io/repos/shovon/sync-prompt/badge.png)](https://coveralls.io/r/shovon/sync-prompt)

Synchronously prompt users for command-line input. Do more on Node.js, with less.

## Usage

Simply run `npm install sync-prompt`, and you should be good to go.

Example usage:

```javascript
var prompt = require('sync-prompt').prompt;

var name = prompt('What is your name? ');
// User enters "Mike".

console.log('Hello, ' + name + '!');
// -> Hello, Mike!

var hidden = true;
var password = prompt('Password: ', hidden);
// User enters a password, but nothing will be written to the screen.
```

## API

### `.prompt([question [, hidden = false]])`

When called, it will prompt the user for a command line input.

#### Parameters

**question**

Type: `string`. Default value: undefined. Optional

When set to a string, the value of `question` will be outputed to the console.

**hidden**

Type: `boolean`. Default value: undefined. Optional, but requires `question` to be set to a string.

When set to true, none of the user's input will be written to the console. This is great for passwords.

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