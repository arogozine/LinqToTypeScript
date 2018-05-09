"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderedAsyncEnumerable_1 = require("../async/OrderedAsyncEnumerable");
const BasicEnumerable_1 = require("./BasicEnumerable");
/**
 * Represents Ordered Enumeration
 * @private
 */
class OrderedEnumerable extends BasicEnumerable_1.BasicEnumerable {
    //#endregion
    constructor(orderedPairs) {
        super(function* () {
            for (const orderedPair of orderedPairs()) {
                yield* orderedPair;
            }
        });
        this.orderedPairs = orderedPairs;
    }
    //#region Sync
    static *asSortedKeyValues(source, keySelector, ascending, comparer) {
        const map = OrderedEnumerable.asKeyMap(source, keySelector);
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
    static asKeyMap(source, keySelector) {
        const map = new Map();
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
    //#endregion
    //#region Async
    static asSortedKeyValuesAsync(source, keySelector, ascending, comparer) {
        return __asyncGenerator(this, arguments, function* asSortedKeyValuesAsync_1() {
            const map = yield __await(OrderedEnumerable.asKeyMapAsync(source, keySelector));
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
        });
    }
    static asKeyMapAsync(source, keySelector) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = new Map();
            for (const item of source) {
                const key = yield keySelector(item);
                const currentMapping = map.get(key);
                if (currentMapping) {
                    currentMapping.push(item);
                }
                else {
                    map.set(key, [item]);
                }
            }
            return map;
        });
    }
    static generateAsync(source, keySelector, ascending, comparer) {
        let orderedPairs;
        if (source instanceof OrderedEnumerable) {
            orderedPairs = function () {
                return __asyncGenerator(this, arguments, function* () {
                    for (const pair of source.orderedPairs()) {
                        yield __await(yield* __asyncDelegator(__asyncValues(OrderedEnumerable
                            .asSortedKeyValuesAsync(pair, keySelector, ascending, comparer))));
                    }
                });
            };
        }
        else {
            orderedPairs = () => OrderedEnumerable.asSortedKeyValuesAsync(source, keySelector, ascending, comparer);
        }
        return new OrderedAsyncEnumerable_1.OrderedAsyncEnumerable(orderedPairs);
    }
    thenBy(keySelector, comparer) {
        return OrderedEnumerable.generate(this, keySelector, true, comparer);
    }
    thenByAsync(keySelector, comparer) {
        return OrderedEnumerable.generateAsync(this, keySelector, true, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return OrderedEnumerable.generate(this, keySelector, false, comparer);
    }
    thenByDescendingAsync(keySelector, comparer) {
        return OrderedEnumerable.generateAsync(this, keySelector, false, comparer);
    }
}
exports.OrderedEnumerable = OrderedEnumerable;
