"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("../BasicEnumerable");
/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An Iterable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns An IEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
function skip(source, count) {
    function* iterator() {
        let i = 0;
        for (const item of source) {
            if (i++ >= count) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.skip = skip;
