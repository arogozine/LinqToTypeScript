"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { IOrderedAsyncEnumerable } from "./../async/IOrderedAsyncEnumerable"
const shared_1 = require("./../shared/shared");
const BasicEnumerable_1 = require("./BasicEnumerable");
const Enumerable_1 = require("./Enumerable");
/**
 * Represents Ordered Enumeration
 */
class OrderedEnumerable extends BasicEnumerable_1.BasicEnumerable {
    constructor(orderedPairs) {
        super(function* () {
            for (const orderedPair of orderedPairs()) {
                yield* orderedPair;
            }
        });
        this.orderedPairs = orderedPairs;
    }
    //#region Sync
    static asSortedKeyValues(source, keySelector, ascending, comparer) {
        const sortFunc = ascending ? OrderedEnumerable.sort : OrderedEnumerable.sortDescending;
        const map = OrderedEnumerable.asKeyMap(source, keySelector);
        return sortFunc(map, comparer);
    }
    static *sort(map, comparer) {
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
        for (const key of sortedKeys) {
            const values = map.get(key);
            yield values;
        }
    }
    static *sortDescending(map, comparer) {
        const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i];
            const values = map.get(key);
            yield values;
        }
    }
    static asKeyMap(source, keySelector) {
        const map = new shared_1.OrderByMap();
        for (const item of source) {
            const key = keySelector(item);
            const currentMapping = map.get(key);
            if (currentMapping) {
                currentMapping.push(item);
            }
            else {
                map.set(key, [item]);
            }
        }
        return map;
    }
    //#endregion
    static generate(source, keySelector, ascending, comparer) {
        let orderedPairs;
        if (source instanceof OrderedEnumerable) {
            orderedPairs = function* () {
                for (const pair of source.orderedPairs()) {
                    yield* OrderedEnumerable
                        .asSortedKeyValues(pair, keySelector, ascending, comparer);
                }
            };
        }
        else {
            orderedPairs = () => OrderedEnumerable.asSortedKeyValues(source, keySelector, ascending, comparer);
        }
        return new OrderedEnumerable(orderedPairs);
    }
    thenBy(keySelector, comparer) {
        return Enumerable_1.Enumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return Enumerable_1.Enumerable.thenByDescending(this, keySelector, comparer);
    }
}
exports.OrderedEnumerable = OrderedEnumerable;
