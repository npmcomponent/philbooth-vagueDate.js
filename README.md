# vagueDate.js

A tiny JavaScript library
that formats precise time differences
as a vague/fuzzy date,
e.g. 'yesterday', 'just now' or 'next week'.

[![Build status][ci-image]][ci-status]

## Installation

### Node.js

```
npm install vague-date
```

### Browser

To use vagueDate.js in a browser environment, you can
either clone the git repository like so:

```
git clone git@github.com:philbooth/vagueDate.js.git
```

Or use one of the growing number of package managers, such as
[Jam][jam],
[Ender][ender] (the package name for both is 'vague-date'),
[Bower][bower] ('vagueDate.js')
or [Component][component] ('philbooth/vagueDate.js').

## Usage

### Loading the library

#### Node.js

```
var vagueDate = require('vague-date');
```

#### Browser

```
<script type="text/javascript" src=".../vagueDate.js/src/vagueDate.min.js"></script>
```

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
defaulting to `'s'` if undefined.

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
[Node.js][node],
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
[jam]: http://jamjs.org/
[component]: https://github.com/component/component
[ender]: https://github.com/ender-js/Ender
[bower]: https://github.com/twitter/bower
[node]: http://nodejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

