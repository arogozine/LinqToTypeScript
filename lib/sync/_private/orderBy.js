"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderedEnumerable_1 = require("../OrderedEnumerable");
/**
 * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedEnumerable<TElement> whose elements are sorted according to a key.
 */
function orderBy(source, keySelector, comparer) {
    return OrderedEnumerable_1.OrderedEnumerable.generate(source, keySelector, true, comparer);
}
exports.orderBy = orderBy;
