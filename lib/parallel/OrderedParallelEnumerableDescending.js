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
class OrderedParallelEnumerableDescending extends BasicParallelEnumerable_1.BasicParallelEnumerable {
    constructor(map, comparer) {
        super(OrderedParallelEnumerableDescending.generate(map, comparer));
        this.map = map;
    }
    static unrollAndSort(mapPromise, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = yield mapPromise;
            const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
            const returnValues = new Array();
            for (let i = sortedKeys.length - 1; i >= 0; i--) {
                const key = sortedKeys[i];
                const values = map.get(key);
                if (values instanceof Map) {
                    for (const value of yield OrderedParallelEnumerableDescending.unrollAndSort(values, comparer)) {
                        returnValues.push(value);
                    }
                }
                else {
                    for (const value of values) {
                        returnValues.push(value);
                    }
                }
            }
            return returnValues;
        });
    }
    static generate(mapFunc, comparer) {
        const generator = () => OrderedParallelEnumerableDescending.unrollAndSort(mapFunc(), comparer);
        return {
            type: 0,
            generator,
        };
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.thenByDescending(this, keySelector, comparer);
    }
}
exports.OrderedParallelEnumerableDescending = OrderedParallelEnumerableDescending;
