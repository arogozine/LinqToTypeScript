"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asKeyMap_1 = require("./asKeyMap");
/**
 * Sorts values in an Iterable based on key and a key comparer.
 * @param source Iterable
 * @param keySelector Key Selector
 * @param ascending Ascending or Descending Sort
 * @param comparer Key Comparer for Sorting. Optional.
 * @returns Iterable Iterator
 */
function* asSortedKeyValues(source, keySelector, ascending, comparer) {
    const map = asKeyMap_1.asKeyMap(source, keySelector);
    const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
    if (ascending) {
        for (let i = 0; i < sortedKeys.length; i++) {
            yield map.get(sortedKeys[i]);
        }
    }
    else {
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            yield map.get(sortedKeys[i]);
        }
    }
}
exports.asSortedKeyValues = asSortedKeyValues;
