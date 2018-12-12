"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Performs a specified action on each element of the Iterable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IEnumerable<T> that executes the action lazily as you iterate.
 */
function each(source, action) {
    function* generator() {
        for (const value of source) {
            action(value);
            yield value;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generator);
}
exports.each = each;
