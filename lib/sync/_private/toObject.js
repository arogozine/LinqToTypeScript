"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts the Iteration to an Object. Duplicate values will be overriden.
 * @param source An Iterable<T> to filter.
 * @param selector A function to determine the Key based on the value.
 * @returns KVP Object
 */
function toObject(source, selector) {
    const map = {};
    for (const value of source) {
        map[selector(value)] = value;
    }
    return map;
}
exports.toObject = toObject;
