"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines whether a sequence contains any elements.
 * If predicate is specified, determines whether any element of a sequence satisfies a condition.
 * @param source The IEnumerable<T> to check for emptiness or apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
function any(source, predicate) {
    if (predicate) {
        return any_2(source, predicate);
    }
    else {
        return any_1(source);
    }
}
exports.any = any;
function any_1(source) {
    for (const _ of source) {
        return true;
    }
    return false;
}
function any_2(source, predicate) {
    for (const item of source) {
        if (predicate(item) === true) {
            return true;
        }
    }
    return false;
}
