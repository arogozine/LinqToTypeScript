"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const asAsyncSortedKeyValues_1 = require("./_ordered/asAsyncSortedKeyValues");
const asAsyncSortedKeyValuesSync_1 = require("./_ordered/asAsyncSortedKeyValuesSync");
const asSortedKeyValues_1 = require("./_ordered/asSortedKeyValues");
const asSortedKeyValuesSync_1 = require("./_ordered/asSortedKeyValuesSync");
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
/**
 * Ordered Async Enumerable
 */
class OrderedAsyncEnumerable extends BasicAsyncEnumerable_1.BasicAsyncEnumerable {
    constructor(orderedPairs) {
        super(function () {
            return __asyncGenerator(this, arguments, function* () {
                var e_1, _a;
                try {
                    for (var _b = __asyncValues(orderedPairs()), _c; _c = yield __await(_b.next()), !_c.done;) {
                        const orderedPair = _c.value;
                        yield __await(yield* __asyncDelegator(__asyncValues(orderedPair)));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        });
        this.orderedPairs = orderedPairs;
    }
    static generateAsync(source, keySelector, ascending, comparer) {
        let orderedPairs;
        if (source instanceof OrderedAsyncEnumerable) {
            orderedPairs = function () {
                return __asyncGenerator(this, arguments, function* () {
                    var e_2, _a;
                    try {
                        for (var _b = __asyncValues(source.orderedPairs()), _c; _c = yield __await(_b.next()), !_c.done;) {
                            const pair = _c.value;
                            yield __await(yield* __asyncDelegator(__asyncValues(asAsyncSortedKeyValuesSync_1.asAsyncSortedKeyValuesSync(pair, keySelector, ascending, comparer))));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                });
            };
        }
        else {
            orderedPairs = () => asAsyncSortedKeyValues_1.asAsyncSortedKeyValues(source, keySelector, ascending, comparer);
        }
        return new OrderedAsyncEnumerable(orderedPairs);
    }
    static generate(source, keySelector, ascending, comparer) {
        let orderedPairs;
        if (source instanceof OrderedAsyncEnumerable) {
            orderedPairs = function () {
                return __asyncGenerator(this, arguments, function* () {
                    var e_3, _a;
                    try {
                        for (var _b = __asyncValues(source.orderedPairs()), _c; _c = yield __await(_b.next()), !_c.done;) {
                            const pair = _c.value;
                            yield __await(yield* __asyncDelegator(__asyncValues(asSortedKeyValuesSync_1.asSortedKeyValuesSync(pair, keySelector, ascending, comparer))));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                });
            };
        }
        else {
            orderedPairs = () => asSortedKeyValues_1.asSortedKeyValues(source, keySelector, ascending, comparer);
        }
        return new OrderedAsyncEnumerable(orderedPairs);
    }
    thenBy(keySelector, comparer) {
        return OrderedAsyncEnumerable.generate(this, keySelector, true, comparer);
    }
    thenByAsync(keySelector, comparer) {
        return OrderedAsyncEnumerable.generateAsync(this, keySelector, true, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return OrderedAsyncEnumerable.generate(this, keySelector, false, comparer);
    }
    thenByDescendingAsync(keySelector, comparer) {
        return OrderedAsyncEnumerable.generateAsync(this, keySelector, false, comparer);
    }
}
exports.OrderedAsyncEnumerable = OrderedAsyncEnumerable;
