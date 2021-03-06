*This repository is a mirror of the [component](http://component.io) module [philbooth/vaguedate.js](http://github.com/philbooth/vaguedate.js). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/philbooth-vaguedate.js`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# vagueDate.js

[![Build status][ci-image]][ci-status]

A tiny JavaScript library
that formats precise time differences
as a vague/fuzzy date,
e.g. 'yesterday', 'today' or 'next week'.

If this project isn't quite what you're looking for,
you may be interested in vagueDate's little sister,
[vagueTime.js][vague-time].
Or if you would like
to parse vague date strings
rather than generate them,
you should try
Matthew Mueller's [date]
or Tim Wood's [moment].

## License

[MIT][license]

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

vagueDate.js exports a single public function, `get`,
which returns a vague date string
based on the argument(s) that you pass it.

The arguments are passed as properties on a single options object.
The optional property `from` is a `Date` instance or timestamp
denoting the origin point from which the vague date will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `to` is a `Date` instance or timestamp
denoting the target point to which the vague date will be calculated,
defaulting to `Date.now()` if undefined.
The optional property `units` is a string,
denoting the units that the `from` and `to` timestamps are specified in,
either `'s'` for seconds or `'ms'` for milliseconds,
defaulting to `'ms'` if undefined.
This property has no effect
when `from` and `to` are `Date` instances
rather than timestamps.

Essentially, if `to` is less than `from` the returned vague date will
indicate some point in the past. If `to` is greater than `from` it will
indicate some point in the future.

### Examples

```
vagueDate.get({
	from: new Date(2013, 0, 1),
	to: new Date(2012, 11, 31)
}); // Returns 'yesterday'

vagueDate.get({
	from: new Date(2013, 0, 1),
	to: new Date(2013, 0, 2)
}); // Returns 'tomorrow'
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
To run the tests in a web browser,
open `test/vagueDate.html`.

[ci-image]: https://secure.travis-ci.org/philbooth/vagueDate.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/vagueDate.js
[vague-time]: https://github.com/philbooth/vagueTime.js
[date]: https://github.com/MatthewMueller/date
[moment]: https://github.com/timrwood/moment
[license]: https://github.com/philbooth/vagueDate.js/blob/master/COPYING
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

