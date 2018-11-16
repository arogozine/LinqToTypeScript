"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
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
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
/**
 * Ordered Parallel Enumerable
 * @private
 */
class OrderedParallelEnumerable extends BasicParallelEnumerable_1.BasicParallelEnumerable {
    constructor(orderedPairs) {
        super({
            generator: () => __awaiter(this, void 0, void 0, function* () {
                var e_1, _a;
                const asyncVals = orderedPairs();
                const array = [];
                try {
                    for (var asyncVals_1 = __asyncValues(asyncVals), asyncVals_1_1; asyncVals_1_1 = yield asyncVals_1.next(), !asyncVals_1_1.done;) {
                        const val = asyncVals_1_1.value;
                        array.push(...val);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (asyncVals_1_1 && !asyncVals_1_1.done && (_a = asyncVals_1.return)) yield _a.call(asyncVals_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return array;
            }),
            type: 0 /* PromiseToArray */,
        });
        this.orderedPairs = orderedPairs;
    }
    //#region Sync
    static asAsyncSortedKeyValues(source, keySelector, ascending, comparer) {
        return __asyncGenerator(this, arguments, function* asAsyncSortedKeyValues_1() {
            const map = yield __await(OrderedParallelEnumerable.asAsyncKeyMap(source, keySelector));
            const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
            if (ascending) {
                for (let i = 0; i < sortedKeys.length; i++) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
            else {
                for (let i = sortedKeys.length - 1; i >= 0; i--) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
        });
    }
    static asAsyncSortedKeyValuesSync(source, keySelector, ascending, comparer) {
        return __asyncGenerator(this, arguments, function* asAsyncSortedKeyValuesSync_1() {
            const map = yield __await(OrderedParallelEnumerable.asAsyncKeyMapSync(source, keySelector));
            const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
            if (ascending) {
                for (let i = 0; i < sortedKeys.length; i++) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
            else {
                for (let i = sortedKeys.length - 1; i >= 0; i--) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
        });
    }
    static asAsyncKeyMapSync(source, keySelector) {
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
    static asAsyncKeyMap(source, keySelector) {
        var source_1, source_1_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_2, _a;
            const map = new Map();
            try {
                for (source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), !source_1_1.done;) {
                    const item = source_1_1.value;
                    const key = yield keySelector(item);
                    const currentMapping = map.get(key);
                    if (currentMapping) {
                        currentMapping.push(item);
                    }
                    else {
                        map.set(key, [item]);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return map;
        });
    }
    //#endregion
    //#region Sync
    static asSortedKeyValues(source, keySelector, ascending, comparer) {
        return __asyncGenerator(this, arguments, function* asSortedKeyValues_1() {
            const map = yield __await(OrderedParallelEnumerable.asKeyMap(source, keySelector));
            const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
            if (ascending) {
                for (let i = 0; i < sortedKeys.length; i++) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
            else {
                for (let i = sortedKeys.length - 1; i >= 0; i--) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
        });
    }
    static asSortedKeyValuesSync(source, keySelector, ascending, comparer) {
        return __asyncGenerator(this, arguments, function* asSortedKeyValuesSync_1() {
            const map = yield __await(OrderedParallelEnumerable.asKeyMapSync(source, keySelector));
            const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
            if (ascending) {
                for (let i = 0; i < sortedKeys.length; i++) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
            else {
                for (let i = sortedKeys.length - 1; i >= 0; i--) {
                    yield yield __await(map.get(sortedKeys[i]));
                }
            }
        });
    }
    static asKeyMapSync(source, keySelector) {
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
    static asKeyMap(source, keySelector) {
        var source_2, source_2_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_3, _a;
            const map = new Map();
            try {
                for (source_2 = __asyncValues(source); source_2_1 = yield source_2.next(), !source_2_1.done;) {
                    const item = source_2_1.value;
                    const key = keySelector(item);
                    const currentMapping = map.get(key);
                    if (currentMapping) {
                        currentMapping.push(item);
                    }
                    else {
                        map.set(key, [item]);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield _a.call(source_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return map;
        });
    }
    //#endregion
    static generateAsync(source, keySelector, ascending, comparer) {
        let orderedPairs;
        if (source instanceof OrderedParallelEnumerable) {
            orderedPairs = function () {
                return __asyncGenerator(this, arguments, function* () {
                    var e_4, _a;
                    try {
                        for (var _b = __asyncValues(source.orderedPairs()), _c; _c = yield __await(_b.next()), !_c.done;) {
                            const pair = _c.value;
                            yield __await(yield* __asyncDelegator(__asyncValues(OrderedParallelEnumerable
                                .asAsyncSortedKeyValuesSync(pair, keySelector, ascending, comparer))));
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                });
            };
        }
        else {
            orderedPairs = () => OrderedParallelEnumerable.asAsyncSortedKeyValues(source, keySelector, ascending, comparer);
        }
        return new OrderedParallelEnumerable(orderedPairs);
    }
    static generate(source, keySelector, ascending, comparer) {
        let orderedPairs;
        if (source instanceof OrderedParallelEnumerable) {
            orderedPairs = function () {
                return __asyncGenerator(this, arguments, function* () {
                    var e_5, _a;
                    try {
                        for (var _b = __asyncValues(source.orderedPairs()), _c; _c = yield __await(_b.next()), !_c.done;) {
                            const pair = _c.value;
                            yield __await(yield* __asyncDelegator(__asyncValues(OrderedParallelEnumerable
                                .asSortedKeyValuesSync(pair, keySelector, ascending, comparer))));
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                });
            };
        }
        else {
            orderedPairs = () => OrderedParallelEnumerable.asSortedKeyValues(source, keySelector, ascending, comparer);
        }
        return new OrderedParallelEnumerable(orderedPairs);
    }
    thenBy(keySelector, comparer) {
        return OrderedParallelEnumerable.generate(this, keySelector, true, comparer);
    }
    thenByAsync(keySelector, comparer) {
        return OrderedParallelEnumerable.generateAsync(this, keySelector, true, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return OrderedParallelEnumerable.generate(this, keySelector, false, comparer);
    }
    thenByDescendingAsync(keySelector, comparer) {
        return OrderedParallelEnumerable.generateAsync(this, keySelector, false, comparer);
    }
}
exports.OrderedParallelEnumerable = OrderedParallelEnumerable;
