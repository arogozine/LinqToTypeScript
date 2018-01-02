"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasicEnumerable_1 = require("./BasicEnumerable");
const Enumerable_1 = require("./Enumerable");
class OrderedEnumerable extends BasicEnumerable_1.BasicEnumerable {
    constructor(map, comparer) {
        super(OrderedEnumerable.generate(map, comparer));
        this.map = map;
    }
    static *unrollAndSort(map, comparer) {
        for (const key of [...map.keys()].sort(comparer ? comparer : undefined)) {
            const values = map.get(key);
            if (values instanceof Map) {
                yield* OrderedEnumerable.unrollAndSort(values, comparer);
            }
            else {
                for (const value of values) {
                    yield value;
                }
            }
        }
    }
    static generate(mapFunc, comparer) {
        return () => OrderedEnumerable.unrollAndSort(mapFunc(), comparer);
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
exports.OrderedEnumerable = OrderedEnumerable;
