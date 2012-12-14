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
            from = normaliseTime(options.from, units, now),
            to = normaliseTime(options.to, units, now),
            difference = from.timestamp - to.timestamp,
            absoluteDifference = Math.abs(difference);

        return estimate(difference, absoluteDifference, from, to) || getYearlyDifference(absoluteDifference, difference);
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

    function normaliseTime (time, units, defaultTime) {
        if (typeof time === 'undefined') {
            return createTimeFrom(defaultTime);
        }

        if (typeof time === 'string') {
            time = parseInt(time, 10);
        }

        if (typeof time !== 'number' || isNaN(time)) {
            throw new Error('Invalid timestamp');
        }

        if (units === 's') {
            return createTimeFrom(time * 1000);
        }

        return createTimeFrom(time);
    }

    function createTimeFrom (thing) {
        if (isDate(thing)) {
            return createTimeFromDate(thing);
        }

        if (isTimestamp(thing)) {
            return createTimeFromTimestamp(thing);
        }
    }

    function isDate (date) {
        return Object.prototype.toString.call(date) === "[object Date]";
    }

    function createTimeFromDate (date) {
        return createTime(date.getTime(), date);
    }

    function createTime (timestamp, date) {
        return {
            timestamp: timestamp,
            day: date.getDay(),
            month: date.getMonth(),
            year: date.getYear()
        };
    }

    function isTimestamp (timestamp) {
        return typeof timestamp === 'number' && isNaN(timestamp) === false;
    }

    function createTimeFromTimestamp (timestamp) {
        return createTime(timestamp, new Date(timestamp));
    }

    function estimate (difference, absoluteDifference, from, to) {
        if (difference === 0) {
            return 'now';
        }

        if (absoluteDifference < day * 2) {
            if (from.day === to.day) {
                return 'today';
            }

            if (areConsecutiveDaysOfWeek(from.day, to.day)) {
                return 'tomorrow';
            }

            if (areConsecutiveDaysOfWeek(to.day, from.day)) {
                return 'yesterday';
            }
        }

        if (absoluteDifference < week) {
            if (difference > 0 && from.day < to.day) {
                return 'last week';
            }

            if (difference < 0 && from.day > to.day) {
                return 'next week';
            }

            return 'this week';
        }

        if (absoluteDifference < week * 2) {
            if (difference > 0 && from.day > to.day) {
                return 'last week';
            }

            if (difference < 0 && from.day < to.day) {
                return 'next week';
            }
        }

        if (absoluteDifference < month * 2) {
            if (from.month === to.month) {
                return 'this month';
            }

            if (areConsecutiveMonthsOfYear(from.month, to.month)) {
                return 'next month';
            }

            if (areConsecutiveMonthsOfYear(to.month, from.month)) {
                return 'last month';
            }
        }

        if (from.year === to.year) {
            return 'this year';
        }

        if (from.year === to.year + 1) {
            return 'last year';
        }

        if (from.year === to.year - 1) {
            return 'next year';
        }
    }

    function setVagueDate (vagueDate) {
        var date = new Date();

        switch (vagueDate) {
            case 'now':
                break;
            case 'today':
                setEndOfDay(date);
                break;
            case 'yesterday':
                date.setDate(date.getDate() - 1);
                setEndOfDay(date);
                break;
            case 'tomorrow':
                date.setDate(date.getDate() + 1);
                setEndOfDay(date);
                break;
            case 'last week':
                setEndOfDay(date);
                break;
            case 'next week':
                setEndOfDay(date);
                break;
            case 'last month':
                setEndOfDay(date);
                break;
            case 'next month':
                setEndOfDay(date);
                break;
            case 'last year':
                setEndOfDay(date);
                break;
            case 'next year':
                setEndOfDay(date);
                break;
            case 'whenever':
                setEndOfDay(date);
                break;
            default:
                throw new Error('Invalid vague date');
        }

        return date;
    }

    function setEndOfDay (date) {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);
    }

    function areConsecutiveDaysOfWeek (first, second) {
        return areConsecutive(first, second, 6);
    }

    function areConsecutive (lesser, greater, maximum) {
        return lesser === greater - 1 || (lesser === maximum && greater === 0);
    }

    function areConsecutiveMonthsOfYear (first, second) {
        return areConsecutive(first, second, 11);
    }

    function getYearlyDifference(absoluteDifference, difference) {
        var years = Math.floor(absoluteDifference / year);

        if (difference < 0) {
            return 'in ' + years + ' years';
        }

        return years + ' years ago';
    }
}());

