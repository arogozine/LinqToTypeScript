"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source An IEnumerable<T> that contains the elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
function all(source, predicate) {
    for (const item of source) {
        if (predicate(item) === false) {
            return false;
        }
    }
    return true;
}
exports.all = all;
