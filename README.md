# vagueDate.js

A tiny JavaScript library
that formats precise time differences
as a vague/fuzzy date,
e.g. 'yesterday' or 'next week'.

[![Build status][ci-image]][ci-status]

## Installation

### Via NPM

```
npm install vague-date
```

### Via Jam

```
jam install vague-date
```

### Via Git

```
git clone git@github.com:philbooth/vagueDate.js.git
```

## Usage

### Loading the library

Both
CommonJS
(e.g.
if you're running on [Node.js][node]
or in the browser with [Browserify])
and AMD
(e.g. if you're using [Require.js][require])
loading styles are supported.
If neither system is detected,
the library defaults to
exporting it's interface globally
as `vagueDate`.

### Calling the library

vagueDate.js exports two public functions, `get` and `set`.

#### vagueDate.get (options)

Returns a vague date string
based on the argument(s) that you pass it.

The arguments are passed as properties on a single options object.
The optional property `from` is a timestamp
denoting the origin point from which the vague date will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `to` is a timestamp
denoting the target point to which the vague date will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `units` is a string,
denoting the units that the `from` and `to` timestamps are specified in,
either `'s'` for seconds or `'ms'` for milliseconds,
defaulting to `'ms'` if undefined.

Essentially, if `to` is less than `from` the returned vague date will
indicate some point in the past. If `to` is greater than `from` it will
indicate some point in the future.

#### vagueDate.set (vagueDate)

TODO

### Examples

```
TODO
```

## Development

### Dependencies

The build environment relies on
Node.js,
[NPM],
[Jake],
[JSHint],
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have Node.js and NPM set up,
you just need to run `npm install`
to install all of the dependencies as listed in `package.json`.

### Unit tests

The unit tests are in `test/vagueDate.js`.
You can run them with the command `npm test` or `jake test`.

[ci-image]: https://secure.travis-ci.org/philbooth/vagueDate.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueDate.js
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

