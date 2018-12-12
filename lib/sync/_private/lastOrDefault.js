"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An Iterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
function lastOrDefault(source, predicate) {
    if (predicate) {
        return lastOrDefault_2(source, predicate);
    }
    else {
        return lastOrDefault_1(source);
    }
}
exports.lastOrDefault = lastOrDefault;
function lastOrDefault_1(source) {
    let last = null;
    for (const value of source) {
        last = value;
    }
    return last;
}
function lastOrDefault_2(source, predicate) {
    let last = null;
    for (const value of source) {
        if (predicate(value) === true) {
            last = value;
        }
    }
    return last;
}
