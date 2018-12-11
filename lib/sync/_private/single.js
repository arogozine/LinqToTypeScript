"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
/**
 * Returns the only element of a sequence that satisfies a specified condition (if specified),
 * and throws an exception if more than one such element exists.
 * @param source An Iterable<T> to return a single element from.
 * @param predicate A function to test an element for a condition. (Optional)
 * @throws {InvalidOperationException} No element satisfies the condition in predicate. OR
 * More than one element satisfies the condition in predicate. OR
 * The source sequence is empty.
 * @returns The single element of the input sequence that satisfies a condition.
 */
function single(source, predicate) {
    if (predicate) {
        return single_2(source, predicate);
    }
    else {
        return single_1(source);
    }
}
exports.single = single;
function single_1(source) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
        if (hasValue === true) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneElement);
        }
        else {
            hasValue = true;
            singleValue = value;
        }
    }
    if (hasValue === false) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
    }
    return singleValue;
}
function single_2(source, predicate) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.MoreThanOneMatchingElement);
            }
            else {
                hasValue = true;
                singleValue = value;
            }
        }
    }
    if (hasValue === false) {
        throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
    }
    return singleValue;
}
