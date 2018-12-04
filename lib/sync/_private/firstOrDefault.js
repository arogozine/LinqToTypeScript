"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns first element in sequence that satisfies predicate otherwise
 * returns the first element in the sequence. Returns null if no value found.
 * @param source An Iterable<T> to return an element from.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The first element in the sequence
 * or the first element that passes the test in the specified predicate function.
 * Returns null if no value found.
 */
function firstOrDefault(source, predicate) {
    if (predicate) {
        return firstOrDefault_2(source, predicate);
    }
    else {
        return firstOrDefault_1(source);
    }
}
exports.firstOrDefault = firstOrDefault;
function firstOrDefault_1(source) {
    const first = source[Symbol.iterator]().next();
    return first.value || null;
}
function firstOrDefault_2(source, predicate) {
    for (const value of source) {
        if (predicate(value) === true) {
            return value;
        }
    }
    return null;
}
