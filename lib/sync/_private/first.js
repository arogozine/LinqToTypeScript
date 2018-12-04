"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
/**
 * Returns first element in sequence that satisfies predicate otherwise
 * returns the first element in the sequence.
 * @param source An Iterable<T> to return an element from.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The first element in the sequence
 * or the first element that passes the test in the specified predicate function.
 * @throws {InvalidOperationException} No elements in Iteration matching predicate
 */
function first(source, predicate) {
    if (predicate) {
        return first_2(source, predicate);
    }
    else {
        return first_1(source);
    }
}
exports.first = first;
function first_1(source) {
    // tslint:disable-next-line:no-shadowed-variable
    const first = source[Symbol.iterator]().next();
    if (first.done === true) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
    }
    return first.value;
}
function first_2(source, predicate) {
    for (const value of source) {
        if (predicate(value) === true) {
            return value;
        }
    }
    throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
}
