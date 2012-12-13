/*globals module, window */

(function () {
    'use strict';

    var functions = {
        get: getVagueDate,
        set: setVagueDate
    },

    second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = day * 31,
    year = day * 365;

    if (typeof module === 'undefined' || module === null) {
        window.vagueDate = functions;
    } else {
        module.exports = functions;
    }

    function getVagueDate (options) {
        var units = normaliseUnits(options.units),
            now = Date.now(),
            from = {
                timestamp: normaliseTimestamp(options.from, units, now)
            },
            to = {
                timestamp: normaliseTimestamp(options.to, units, now)
            },
            difference = from.timestamp - to.timestamp,
            years;

        from.date = new Date(from.timestamp);
        to.date = new Date(to.timestamp);

        if (difference === 0) {
            return 'now';
        }

        if (Math.abs(difference) < day * 2) {
            if (from.date.getDay() === to.date.getDay()) {
                return 'today';
            }

            if (
                from.date.getDay() === to.date.getDay() + 1 ||
                (from.date.getDay() === 0 && to.date.getDay() === 6)
            ) {
                return 'yesterday';
            }

            if (
                from.date.getDay() === to.date.getDay() - 1 ||
                (from.date.getDay() === 6 && to.date.getDay() === 0)
            ) {
                return 'tomorrow';
            }
        }

        if (Math.abs(difference) < week) {
            if (difference > 0 && from.date.getDay() < to.date.getDay()) {
                return 'last week';
            }

            if (difference < 0 && from.date.getDay() > to.date.getDay()) {
                return 'next week';
            }

            return 'this week';
        }

        if (Math.abs(difference) < week * 2) {
            if (difference > 0 && from.date.getDay() > to.date.getDay()) {
                return 'last week';
            }

            if (difference < 0 && from.date.getDay() < to.date.getDay()) {
                return 'next week';
            }
        }

        if (Math.abs(difference) < month * 2) {
            if (from.date.getMonth() === to.date.getMonth()) {
                return 'this month';
            }

            if (
                from.date.getMonth() === to.date.getMonth() + 1 ||
                (from.date.getMonth() === 0 && to.date.getMonth() === 11)
            ) {
                return 'last month';
            }

            if (
                from.date.getMonth() === to.date.getMonth() - 1 ||
                (from.date.getMonth() === 11 && to.date.getMonth() === 0)
            ) {
                return 'next month';
            }
        }

        if (from.date.getYear() === to.date.getYear()) {
            return 'this year';
        }

        if (from.date.getYear() === to.date.getYear() + 1) {
            return 'last year';
        }

        if (from.date.getYear() === to.date.getYear() - 1) {
            return 'next year';
        }

        years = Math.floor(Math.abs(difference) / year);

        if (difference < 0) {
            return 'in ' + years + ' years';
        }

        return years + ' years ago';
    }

    function normaliseUnits (units) {
        if (typeof units === 'undefined') {
            return 'ms';
        }

        if (units === 's' || units === 'ms') {
            return units;
        }

        throw new Error('Invalid units');
    }

    function normaliseTimestamp (time, units, defaultTime) {
        if (typeof time === 'undefined') {
            return defaultTime;
        }

        if (typeof time === 'string') {
            time = parseInt(time, 10);
        }

        if (typeof time !== 'number' || isNaN(time)) {
            throw new Error('Invalid timestamp');
        }

        if (units === 's') {
            return time * 1000;
        }

        return time;
    }

    function setVagueDate () {
    }
}());

