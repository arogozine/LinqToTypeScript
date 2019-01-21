"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderedParallelEnumerable_1 = require("../OrderedParallelEnumerable");
/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
function orderByDescendingAsync(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generateAsync(source, keySelector, false, comparer);
}
exports.orderByDescendingAsync = orderByDescendingAsync;
