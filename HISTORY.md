# History

- v0.4.1
  - Removed dependency of `termios.h`. Including it prevents sync-prompt from compiling on Windows.

- v0.4.0
  - Added a `isEOF` method. This allows us to check to see if `cin` has reached EOF.

- v0.3.2
  - Just like v0.3.1, there's absolutely no bug fixes. Just some marketing fluff update.

- v0.3.1
  - a version bump from v0.3.0 to v0.3.1. There are absolutely no bug fixes in this one. I was simply not able to publish to v0.3.0, because I was too eager to publish to v0.3.0, but not actually wanting to publish it. But now, it seems NPM does not allow us to [overrite changes to a particular version](https://github.com/npm/npm-registry-couchapp/issues/148).

- v0.3.0
  - added a `prompt.hidden` method
  - deprecated the `hidden` parameter being passed to the `prompt` function, in favour of `prompt.hidden`. The parameter will still be available, just that it may be removed in a future release
  - fixed a bug where a new-line was not appended after a hidden prompt
  - added support for Node.js v0.11

- v0.2.2
  - GCC 4.7 now successfully compiles sync-prompt

- v0.2.1
  - fixed erratum in README.md

- v0.2.0
  - added an optional parameter to `.prompt`--`hidden`. If set to true, the output will not be displayed as the user types. It's great for passwords
  - some code formatting changes
  - updates to unit tests
  - added a script to view code coverage report

- v0.1.0
  - converted the API to accept a string parameter, and display to stdout.

- v0.0.1
  - fixed a bug that prevented the prompt from accepting stdin input with spaces in them

- v0.0.0
  - initial release