"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IEnumerable<T> to filter.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
function where(source, predicate) {
    if (predicate.length === 1) {
        return where_1(source, predicate);
    }
    else {
        return where_2(source, predicate);
    }
}
exports.where = where;
function where_1(source, predicate) {
    function* iterator() {
        for (const item of source) {
            if (predicate(item) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function where_2(source, predicate) {
    function* iterator() {
        let i = 0;
        for (const item of source) {
            if (predicate(item, i++) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
