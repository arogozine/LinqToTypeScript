"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorString_1 = require("../../shared/ErrorString");
const InvalidOperationException_1 = require("../../shared/InvalidOperationException");
/**
 * If predicate is specified returns the only element of a sequence that satisfies a specified condition,
 * ootherwise returns the only element of a sequence. Returns a default value if no such element exists.
 * @param source An Iterable<T> to return a single element from.
 * @param predicate A function to test an element for a condition. Optional.
 * @throws {InvalidOperationException}
 * If predicate is specified more than one element satisfies the condition in predicate,
 * otherwise the input sequence contains more than one element.
 * @returns The single element of the input sequence that satisfies the condition,
 * or null if no such element is found.
 */
function singleOrDefault(source, predicate) {
    if (predicate) {
        return singleOrDefault_2(source, predicate);
    }
    else {
        return singleOrDefault_1(source);
    }
}
exports.singleOrDefault = singleOrDefault;
function singleOrDefault_1(source) {
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
    return singleValue;
}
function singleOrDefault_2(source, predicate) {
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
    return singleValue;
}
