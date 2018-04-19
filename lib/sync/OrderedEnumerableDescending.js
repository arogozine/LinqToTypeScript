"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("./BasicEnumerable");
const Enumerable_1 = require("./Enumerable");
/**
 * Result from the orderByDescending function
 */
class OrderedEnumerableDescending extends BasicEnumerable_1.BasicEnumerable {
    constructor(map, comparer) {
        super(OrderedEnumerableDescending.generate(map, comparer));
        this.map = map;
    }
    static *unrollAndSort(map, comparer) {
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i];
            const values = map.get(key);
            if (values instanceof Map) {
                yield* OrderedEnumerableDescending.unrollAndSort(values, comparer);
            }
            else {
                // Because the key is from the same map
                // as the values, values cannot be undefined
                for (const value of values) {
                    yield value;
                }
            }
        }
    }
    static generate(mapFunc, comparer) {
        return () => OrderedEnumerableDescending.unrollAndSort(mapFunc(), comparer);
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return Enumerable_1.Enumerable.thenBy(this, keySelector, comparer);
    }
    thenByAsync(keySelector, comparer) {
        return Enumerable_1.Enumerable.thenByAsync(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return Enumerable_1.Enumerable.thenByDescending(this, keySelector, comparer);
    }
    thenByDescendingAsync(keySelector, comparer) {
        return Enumerable_1.Enumerable.thenByDescendingAsync(this, keySelector, comparer);
    }
}
exports.OrderedEnumerableDescending = OrderedEnumerableDescending;
