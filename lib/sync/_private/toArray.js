"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates an array from a Iterable<T>.
 * @param source An Iterable<T> to create an array from.
 */
function toArray(source) {
    return [...source];
}
exports.toArray = toArray;
