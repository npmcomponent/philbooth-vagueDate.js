/*globals require, exports */

(function () {
    'use strict';

    var assert = require('chai').assert,

    modulePath = '../src/vagueDate';

    suite('vagueDate:', function () {
        test('require does not throw', function () {
            assert.doesNotThrow(function () {
                require(modulePath);
            });
        });

        test('require returns object', function () {
            assert.isObject(require(modulePath));
        });

        suite('require:', function () {
            var vagueDate;

            setup(function () {
                vagueDate = require(modulePath);
            });

            teardown(function () {
                vagueDate = null;
            });

            test('get function is exported', function () {
                assert.isFunction(vagueDate.get);
            });

            test('get throws with no arguments', function () {
                assert.throws(function () {
                    vagueDate.get();
                });
            });

            test('get throws when from is bad string', function () {
                assert.throws(function () {
                    vagueDate.get({
                        from: 'foo',
                        to: 1234567890,
                        units: 's'
                    });
                });
            });

            test('get throws when to is bad string', function () {
                assert.throws(function () {
                    vagueDate.get({
                        from: 1234567890,
                        to: 'foo',
                        units: 's'
                    });
                });
            });

            test('get throws when units is bad string', function () {
                assert.throws(function () {
                    vagueDate.get({
                        from: 1234567890,
                        to: 1234567890,
                        units: 'foo'
                    });
                });
            });

            test('get returns now when times are equal', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 13, 14, 5, 33),
                    to: timestamp(2012, 11, 13, 14, 5, 33)
                }), 'now');
            });

            test('get returns today when time is 1 second ago', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 13, 14, 7, 1),
                    to: timestamp(2012, 11, 13, 14, 7, 0)
                }), 'today');
            });

            test('get returns today when time is in 1 second', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 13, 14, 7, 0),
                    to: timestamp(2012, 11, 13, 14, 7, 1)
                }), 'today');
            });

            test('get returns yesterday when time is 1 second ago yesterday', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 13, 0, 0, 0),
                    to: timestamp(2012, 11, 12, 23, 59, 59)
                }), 'yesterday');
            });

            test('get returns tomorrow when time is in 1 second tomorrow', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 12, 23, 59, 59),
                    to: timestamp(2012, 11, 13, 0, 0, 0)
                }), 'tomorrow');
            });

            test('get returns yesterday when time is 1 second ago from Sunday to Saturday', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 16, 0, 0, 0),
                    to: timestamp(2012, 11, 15, 23, 59, 59)
                }), 'yesterday');
            });

            test('get returns tomorrow when time is in 1 second from Saturday to Sunday', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 15, 23, 59, 59),
                    to: timestamp(2012, 11, 16, 0, 0, 0)
                }), 'tomorrow');
            });

            test('get returns yesterday when time is 48 hours ago yesterday', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 13, 23, 59, 59),
                    to: timestamp(2012, 11, 12, 0, 0, 0)
                }), 'yesterday');
            });

            test('get returns tomorrow when time is in 48 hours tomorrow', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 12, 0, 0, 0),
                    to: timestamp(2012, 11, 13, 23, 59, 59)
                }), 'tomorrow');
            });

            test('get returns this week when time is 7 days ago this week', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 15, 23, 59, 59),
                    to: timestamp(2012, 11, 9, 0, 0, 0)
                }), 'this week');
            });

            test('get returns this week when time is in 7 days this week', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 9, 0, 0, 0),
                    to: timestamp(2012, 11, 15, 23, 59, 59)
                }), 'this week');
            });

            test('get returns last week when time is 7 days ago last week', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 10, 23, 59, 59),
                    to: timestamp(2012, 11, 4, 0, 0, 0)
                }), 'last week');
            });

            test('get returns next week when time is in 7 days next week', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 4, 0, 0, 0),
                    to: timestamp(2012, 11, 10, 23, 59, 59)
                }), 'next week');
            });

            test('get returns last week when time is 14 days ago last week', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 15, 23, 59, 59),
                    to: timestamp(2012, 11, 2, 0, 0, 0)
                }), 'last week');
            });

            test('get returns next week when time is in 14 days next week', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 2, 0, 0, 0),
                    to: timestamp(2012, 11, 15, 23, 59, 59)
                }), 'next week');
            });

            test('get returns this month when time is 14 days ago 2 weeks ago', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 16, 23, 59, 59),
                    to: timestamp(2012, 11, 3, 0, 0, 0)
                }), 'this month');
            });

            test('get returns this month when time is in 14 days in 2 weeks', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 3, 0, 0, 0),
                    to: timestamp(2012, 11, 16, 23, 59, 59)
                }), 'this month');
            });

            test('get returns last month when time is 14 days ago last month', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 9, 23, 59, 59),
                    to: timestamp(2012, 10, 26, 0, 0, 0)
                }), 'last month');
            });

            test('get returns next month when time is in 14 days next month', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 10, 26, 0, 0, 0),
                    to: timestamp(2012, 11, 9, 23, 59, 59)
                }), 'next month');
            });

            test('get returns last month when time is 14 days ago from January to December', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2013, 0, 11, 23, 59, 59),
                    to: timestamp(2012, 11, 29, 0, 0, 0)
                }), 'last month');
            });

            test('get returns next month when time is in 14 days from December to January', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 29, 0, 0, 0),
                    to: timestamp(2013, 0, 11, 23, 59, 59)
                }), 'next month');
            });

            test('get returns last month when time is 2 months ago last month', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 31, 23, 59, 59),
                    to: timestamp(2012, 10, 1, 0, 0, 0)
                }), 'last month');
            });

            test('get returns next month when time is in 2 months next month', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 10, 1, 0, 0, 0),
                    to: timestamp(2012, 11, 31, 23, 59, 59)
                }), 'next month');
            });

            test('get returns last year when time is 2 months ago last year', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2013, 2, 1, 0, 0, 0),
                    to: timestamp(2012, 11, 1, 0, 0, 0)
                }), 'last year');
            });

            test('get returns next year when time is in 2 months next year', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 1, 0, 0, 0),
                    to: timestamp(2013, 2, 1, 0, 0, 0)
                }), 'next year');
            });

            test('get returns last year when time is 2 years ago last year', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2013, 11, 31, 23, 59, 59),
                    to: timestamp(2012, 1, 1, 0, 0, 0)
                }), 'last year');
            });

            test('get returns next year when time is in 2 years next year', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 1, 1, 0, 0, 0),
                    to: timestamp(2013, 11, 31, 23, 59, 59)
                }), 'next year');
            });

            test('get returns 2 years ago year when time is 2 years ago', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2013, 1, 1, 0, 0, 0),
                    to: timestamp(2011, 1, 1, 0, 0, 0)
                }), '2 years ago');
            });

            test('get returns next year when time is in 2 years', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2011, 1, 1, 0, 0, 0),
                    to: timestamp(2013, 1, 1, 0, 0, 0)
                }), 'in 2 years');
            });

            test('get accepts seconds', function () {
                assert.strictEqual(vagueDate.get({
                    from: timestamp(2012, 11, 13, 0, 0, 0) / 1000,
                    to: timestamp(2012, 11, 12, 23, 59, 0) / 1000,
                    units: 's'
                }), 'yesterday');
            });

            test('get accepts string arguments', function () {
                assert.strictEqual(vagueDate.get({
                    from: '1234567890',
                    to: '1234567890'
                }), 'now');
            });

            test('get accepts date arguments', function () {
                assert.strictEqual(vagueDate.get({
                    from: new Date(1234567890),
                    to: new Date(1234567890)
                }), 'now');
            });

            test('until defaults to now', function () {
                assert.include(vagueDate.get({
                    to: Date.now()
                }), 'now');
            });

            test('from defaults to now', function () {
                assert.include(vagueDate.get({
                    to: Date.now()
                }), 'now');
            });

            test('set function is exported', function () {
                assert.isFunction(vagueDate.set);
            });

            test('set throws with no arguments', function () {
                assert.throws(function () {
                    vagueDate.set();
                });
            });

            test('set throws with bad argument', function () {
                assert.throws(function () {
                    vagueDate.set('foo');
                });
            });
        });
    });

    function timestamp (year, month, day, hour, minute, second) {
        var date = new Date(year, month, day, hour, minute, second);

        return date.getTime();
    }
}());

