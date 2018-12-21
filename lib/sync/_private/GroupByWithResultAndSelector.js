"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrictEqualityComparer_1 = require("../../shared/StrictEqualityComparer");
const BasicEnumerable_1 = require("../BasicEnumerable");
const groupByShared_1 = require("./groupByShared");
/**
 * Groups the elements of a sequence according to a specified key selector function and
 * creates a result value from each group and its key.
 * If specified, the key values are compared by using a specified comparer.
 * The elements of each group are projected by using a specified function.
 * @param source An Iterable<T> whose elements to group.
 * @param keySelector A function to extract the key for each element.
 * @param elementSelector A function to map each source element to an element in an IGrouping<TKey,TElement>.
 * @param resultSelector A function to create a result value from each group.
 * @param comparer An IEqualityComparer<T> to compare keys with.
 * @returns A collection of elements of type TResult
 * where each element represents a projection over a group and its key.
 */
function groupByWithResultAndSelector(source, keySelector, elementSelector, resultSelector, comparer) {
    if (comparer) {
        return groupBy3(source, keySelector, elementSelector, resultSelector);
    }
    else {
        return groupBy3Simple(source, keySelector, elementSelector, resultSelector);
    }
}
exports.groupByWithResultAndSelector = groupByWithResultAndSelector;
const groupBy3Simple = (source, keySelector, elementSelector, resultSelector) => {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_1_Simple(source, keySelector, elementSelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
};
const groupBy3 = (source, keySelector, elementSelector, resultSelector, comparer = StrictEqualityComparer_1.StrictEqualityComparer) => {
    function* iterator() {
        const groupByResult = groupByShared_1.groupBy_1(source, keySelector, elementSelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
};
