"use strict";
// TODO - Async and Parallel Implementations
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Paritions the Iterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Pass / Fail condition
 */
function partition(source, predicate) {
    const fail = [];
    const pass = [];
    for (const value of source) {
        if (predicate(value) === true) {
            pass.push(value);
        }
        else {
            fail.push(value);
        }
    }
    return [fail, pass];
}
exports.partition = partition;
