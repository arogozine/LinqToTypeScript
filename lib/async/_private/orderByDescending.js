"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderedAsyncEnumerable_1 = require("../OrderedAsyncEnumerable");
/**
 * Sorts the elements of a sequence in descending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @return An IOrderedAsyncEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
function orderByDescending(source, keySelector, comparer) {
    return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generate(source, keySelector, false, comparer);
}
exports.orderByDescending = orderByDescending;
