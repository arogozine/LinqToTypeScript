"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Projects each element of a sequence into a new form.
 * @param source A sequence of values to invoke a transform function on.
 * @param selector A key of TSource.
 * @returns
 * An IEnumerable<T> whose elements are the result of getting the value from the key on each element of source.
 */
function select(source, selector) {
    if (typeof selector === "string") {
        return select_2(source, selector);
    }
    else {
        return select_1(source, selector);
    }
}
exports.select = select;
function select_1(source, selector) {
    function* iterator() {
        for (const value of source) {
            yield selector(value);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function select_2(source, key) {
    function* iterator() {
        for (const value of source) {
            yield value[key];
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
