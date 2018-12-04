"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An Iterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IEnumerable<T> that contains the elements from the input sequence starting at the first element
 * in the linear series that does not pass the test specified by predicate.
 */
function skipWhile(source, predicate) {
    if (predicate.length === 1) {
        return skipWhile_1(source, predicate);
    }
    else {
        return skipWhile_2(source, predicate);
    }
}
exports.skipWhile = skipWhile;
function skipWhile_1(source, predicate) {
    function* iterator() {
        let skip = true;
        for (const item of source) {
            if (skip === false) {
                yield item;
            }
            else if (predicate(item) === false) {
                skip = false;
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function skipWhile_2(source, predicate) {
    function* iterator() {
        let index = 0;
        let skip = true;
        for (const item of source) {
            if (skip === false) {
                yield item;
            }
            else if (predicate(item, index) === false) {
                skip = false;
                yield item;
            }
            index++;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
