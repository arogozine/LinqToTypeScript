"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
const ParallelEnumerable_1 = require("./ParallelEnumerable");
/**
 * Ordered Parallel Enumerable
 */
class OrderedParallelEnumerable extends BasicParallelEnumerable_1.BasicParallelEnumerable {
    constructor(map, comparer) {
        super(OrderedParallelEnumerable.generate(map, comparer));
        this.map = map;
    }
    static unrollAndSort(mapPromise, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield mapPromise;
            const returnValues = new Array();
            for (const key of [...map.keys()].sort(comparer ? comparer : undefined)) {
                const values = map.get(key);
                if (values instanceof Map) {
                    for (const value of yield OrderedParallelEnumerable.unrollAndSort(values, comparer)) {
                        returnValues.push(value);
                    }
                }
                else {
                    // Because the key is from the same map
                    // as the values, values cannot be undefined
                    for (const value of values) {
                        returnValues.push(value);
                    }
                }
            }
            return returnValues;
        });
    }
    static generate(mapFunc, comparer) {
        const generator = () => OrderedParallelEnumerable.unrollAndSort(mapFunc(), comparer);
        return {
            generator,
            type: 0 /* PromiseToArray */,
        };
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.thenBy(this, keySelector, comparer);
    }
    thenByAsync(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.thenByAsync(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.thenByDescending(this, keySelector, comparer);
    }
    thenByDescendingAsync(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.thenByDescendingAsync(this, keySelector, comparer);
    }
}
exports.OrderedParallelEnumerable = OrderedParallelEnumerable;
