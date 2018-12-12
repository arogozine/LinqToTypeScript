"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An Iterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
function last(source, predicate) {
    if (predicate) {
        return last_2(source, predicate);
    }
    else {
        return last_1(source);
    }
}
exports.last = last;
function last_1(source) {
    let lastItem;
    for (const value of source) {
        lastItem = value;
    }
    if (!lastItem) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
    }
    return lastItem;
}
function last_2(source, predicate) {
    let lastItem;
    for (const value of source) {
        if (predicate(value) === true) {
            lastItem = value;
        }
    }
    if (!lastItem) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
    }
    return lastItem;
}
