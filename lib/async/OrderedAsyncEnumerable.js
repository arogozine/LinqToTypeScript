"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
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
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncEnumerable_1 = require("./AsyncEnumerable");
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
/**
 * Ordered Async Enumerable
 */
class OrderedAsyncEnumerable extends BasicAsyncEnumerable_1.BasicAsyncEnumerable {
    constructor(map, comparer) {
        super(OrderedAsyncEnumerable.generate(map, comparer));
        this.map = map;
    }
    static unrollAndSort(mapPromise, comparer) {
        return __asyncGenerator(this, arguments, function* unrollAndSort_1() {
            const map = yield __await(mapPromise);
            for (const key of [...map.keys()].sort(comparer ? comparer : undefined)) {
                const values = map.get(key);
                if (values instanceof Map) {
                    yield __await(yield* __asyncDelegator(__asyncValues(OrderedAsyncEnumerable.unrollAndSort(values, comparer))));
                }
                else {
                    // Because the key is from the same map
                    // as the values, values cannot be undefined
                    for (const value of values) {
                        yield value;
                    }
                }
            }
        });
    }
    static generate(mapFunc, comparer) {
        return () => OrderedAsyncEnumerable.unrollAndSort(mapFunc(), comparer);
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.thenBy(this, keySelector, comparer);
    }
    thenByAsync(keySelector, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.thenByAsync(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.thenByDescending(this, keySelector, comparer);
    }
    thenByDescendingAsync(keySelector, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.thenByDescendingAsync(this, keySelector, comparer);
    }
}
exports.OrderedAsyncEnumerable = OrderedAsyncEnumerable;
