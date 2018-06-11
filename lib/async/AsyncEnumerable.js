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
require("core-js/modules/es7.symbol.async-iterator");
const parallel_1 = require("../parallel/parallel");
const shared_1 = require("./../shared/shared");
const sync_1 = require("./../sync/sync");
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
const OrderedAsyncEnumerable_1 = require("./OrderedAsyncEnumerable");
/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */
class AsyncEnumerable {
    static aggregate(source, seedOrFunc, func, resultSelector) {
        if (resultSelector) {
            if (!func) {
                throw new ReferenceError(`TAccumulate function is undefined`);
            }
            return AsyncEnumerable.aggregate_3(source, seedOrFunc, func, resultSelector);
        }
        else if (func) {
            return AsyncEnumerable.aggregate_2(source, seedOrFunc, func);
        }
        else {
            return AsyncEnumerable.aggregate_1(source, seedOrFunc);
        }
    }
    static aggregate_1(source, func) {
        var source_1, source_1_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            let aggregateValue;
            try {
                for (source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), !source_1_1.done;) {
                    const value = yield source_1_1.value;
                    if (aggregateValue) {
                        aggregateValue = func(aggregateValue, value);
                    }
                    else {
                        aggregateValue = value;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (aggregateValue === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return aggregateValue;
        });
    }
    static aggregate_2(source, seed, func) {
        var source_2, source_2_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_2, _a;
            let aggregateValue = seed;
            try {
                for (source_2 = __asyncValues(source); source_2_1 = yield source_2.next(), !source_2_1.done;) {
                    const value = yield source_2_1.value;
                    aggregateValue = func(aggregateValue, value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield _a.call(source_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return aggregateValue;
        });
    }
    static aggregate_3(source, seed, func, resultSelector) {
        var source_3, source_3_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_3, _a;
            let aggregateValue = seed;
            try {
                for (source_3 = __asyncValues(source); source_3_1 = yield source_3.next(), !source_3_1.done;) {
                    const value = yield source_3_1.value;
                    aggregateValue = func(aggregateValue, value);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (source_3_1 && !source_3_1.done && (_a = source_3.return)) yield _a.call(source_3);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return resultSelector(aggregateValue);
        });
    }
    static all(source, predicate) {
        var source_4, source_4_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_4, _a;
            try {
                for (source_4 = __asyncValues(source); source_4_1 = yield source_4.next(), !source_4_1.done;) {
                    const item = yield source_4_1.value;
                    if (predicate(item) === false) {
                        return false;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (source_4_1 && !source_4_1.done && (_a = source_4.return)) yield _a.call(source_4);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return true;
        });
    }
    static allAsync(source, predicate) {
        var source_5, source_5_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_5, _a;
            try {
                for (source_5 = __asyncValues(source); source_5_1 = yield source_5.next(), !source_5_1.done;) {
                    const item = yield source_5_1.value;
                    if ((yield predicate(item)) === false) {
                        return false;
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (source_5_1 && !source_5_1.done && (_a = source_5.return)) yield _a.call(source_5);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return true;
        });
    }
    static any(source, predicate) {
        if (predicate) {
            return AsyncEnumerable.any_2(source, predicate);
        }
        else {
            return AsyncEnumerable.any_1(source);
        }
    }
    static any_1(source) {
        var source_6, source_6_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_6, _a;
            try {
                for (source_6 = __asyncValues(source); source_6_1 = yield source_6.next(), !source_6_1.done;) {
                    const _ = yield source_6_1.value;
                    return true;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (source_6_1 && !source_6_1.done && (_a = source_6.return)) yield _a.call(source_6);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return false;
        });
    }
    static any_2(source, predicate) {
        var source_7, source_7_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_7, _a;
            try {
                for (source_7 = __asyncValues(source); source_7_1 = yield source_7.next(), !source_7_1.done;) {
                    const item = yield source_7_1.value;
                    if (predicate(item) === true) {
                        return true;
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (source_7_1 && !source_7_1.done && (_a = source_7.return)) yield _a.call(source_7);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return false;
        });
    }
    static anyAsync(source, predicate) {
        var source_8, source_8_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_8, _a;
            try {
                for (source_8 = __asyncValues(source); source_8_1 = yield source_8.next(), !source_8_1.done;) {
                    const item = yield source_8_1.value;
                    if ((yield predicate(item)) === true) {
                        return true;
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield _a.call(source_8);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return false;
        });
    }
    static average(source, selector) {
        if (selector) {
            return AsyncEnumerable.average_2(source, selector);
        }
        else {
            return AsyncEnumerable.average_1(source);
        }
    }
    static average_1(source) {
        var source_9, source_9_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_9, _a;
            let value;
            let count;
            try {
                for (source_9 = __asyncValues(source); source_9_1 = yield source_9.next(), !source_9_1.done;) {
                    const item = yield source_9_1.value;
                    value = (value || 0) + item;
                    count = (count || 0) + 1;
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield _a.call(source_9);
                }
                finally { if (e_9) throw e_9.error; }
            }
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return value / count;
        });
    }
    static average_2(source, func) {
        var source_10, source_10_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_10, _a;
            let value;
            let count;
            try {
                for (source_10 = __asyncValues(source); source_10_1 = yield source_10.next(), !source_10_1.done;) {
                    const item = yield source_10_1.value;
                    value = (value || 0) + func(item);
                    count = (count || 0) + 1;
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield _a.call(source_10);
                }
                finally { if (e_10) throw e_10.error; }
            }
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return value / count;
        });
    }
    static asParallel(source) {
        function generator() {
            return __awaiter(this, void 0, void 0, function* () {
                var e_11, _a;
                const data = [];
                try {
                    for (var source_11 = __asyncValues(source), source_11_1; source_11_1 = yield source_11.next(), !source_11_1.done;) {
                        const value = yield source_11_1.value;
                        data.push(value);
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (source_11_1 && !source_11_1.done && (_a = source_11.return)) yield _a.call(source_11);
                    }
                    finally { if (e_11) throw e_11.error; }
                }
                return data;
            });
        }
        return parallel_1.ParallelEnumerable.from(0 /* PromiseToArray */, generator);
    }
    static averageAsync(source, func) {
        var source_12, source_12_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_12, _a;
            let value;
            let count;
            try {
                for (source_12 = __asyncValues(source); source_12_1 = yield source_12.next(), !source_12_1.done;) {
                    const item = yield source_12_1.value;
                    value = (value || 0) + (yield func(item));
                    count = (count || 0) + 1;
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (source_12_1 && !source_12_1.done && (_a = source_12.return)) yield _a.call(source_12);
                }
                finally { if (e_12) throw e_12.error; }
            }
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return value / count;
        });
    }
    static concat(first, second) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_1() {
                yield __await(yield* __asyncDelegator(__asyncValues(first)));
                yield __await(yield* __asyncDelegator(__asyncValues(second)));
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static contains(source, value, comparer = shared_1.StrictEqualityComparer) {
        var source_13, source_13_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_13, _a;
            try {
                for (source_13 = __asyncValues(source); source_13_1 = yield source_13.next(), !source_13_1.done;) {
                    const item = yield source_13_1.value;
                    if (comparer(value, item)) {
                        return true;
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (source_13_1 && !source_13_1.done && (_a = source_13.return)) yield _a.call(source_13);
                }
                finally { if (e_13) throw e_13.error; }
            }
            return false;
        });
    }
    static containsAsync(source, value, comparer) {
        var source_14, source_14_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_14, _a;
            try {
                for (source_14 = __asyncValues(source); source_14_1 = yield source_14.next(), !source_14_1.done;) {
                    const item = yield source_14_1.value;
                    if (yield comparer(value, item)) {
                        return true;
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (source_14_1 && !source_14_1.done && (_a = source_14.return)) yield _a.call(source_14);
                }
                finally { if (e_14) throw e_14.error; }
            }
            return false;
        });
    }
    static count(source, predicate) {
        if (predicate) {
            return AsyncEnumerable.count_2(source, predicate);
        }
        else {
            return AsyncEnumerable.count_1(source);
        }
    }
    static count_1(source) {
        var source_15, source_15_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_15, _a;
            let count = 0;
            try {
                for (source_15 = __asyncValues(source); source_15_1 = yield source_15.next(), !source_15_1.done;) {
                    const _ = yield source_15_1.value;
                    count++;
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (source_15_1 && !source_15_1.done && (_a = source_15.return)) yield _a.call(source_15);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return count;
        });
    }
    static count_2(source, predicate) {
        var source_16, source_16_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_16, _a;
            let count = 0;
            try {
                for (source_16 = __asyncValues(source); source_16_1 = yield source_16.next(), !source_16_1.done;) {
                    const value = yield source_16_1.value;
                    if (predicate(value) === true) {
                        count++;
                    }
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (source_16_1 && !source_16_1.done && (_a = source_16.return)) yield _a.call(source_16);
                }
                finally { if (e_16) throw e_16.error; }
            }
            return count;
        });
    }
    static countAsync(source, predicate) {
        var source_17, source_17_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_17, _a;
            let count = 0;
            try {
                for (source_17 = __asyncValues(source); source_17_1 = yield source_17.next(), !source_17_1.done;) {
                    const value = yield source_17_1.value;
                    if ((yield predicate(value)) === true) {
                        count++;
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (source_17_1 && !source_17_1.done && (_a = source_17.return)) yield _a.call(source_17);
                }
                finally { if (e_17) throw e_17.error; }
            }
            return count;
        });
    }
    static distinct(source, comparer = shared_1.StrictEqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_2() {
                var e_18, _a;
                const distinctElements = [];
                try {
                    for (var source_18 = __asyncValues(source), source_18_1; source_18_1 = yield __await(source_18.next()), !source_18_1.done;) {
                        const item = yield yield __await(__await(source_18_1.value));
                        const foundItem = distinctElements.find((x) => comparer(x, item));
                        if (!foundItem) {
                            distinctElements.push(item);
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_18_1) { e_18 = { error: e_18_1 }; }
                finally {
                    try {
                        if (source_18_1 && !source_18_1.done && (_a = source_18.return)) yield __await(_a.call(source_18));
                    }
                    finally { if (e_18) throw e_18.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static distinctAsync(source, comparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_3() {
                var e_19, _a;
                const distinctElements = [];
                try {
                    outerLoop: for (var source_19 = __asyncValues(source), source_19_1; source_19_1 = yield __await(source_19.next()), !source_19_1.done;) {
                        const item = yield yield __await(__await(source_19_1.value));
                        for (const distinctElement of distinctElements) {
                            const found = yield __await(comparer(distinctElement, item));
                            if (found) {
                                continue outerLoop;
                            }
                        }
                        distinctElements.push(item);
                        yield yield __await(item);
                    }
                }
                catch (e_19_1) { e_19 = { error: e_19_1 }; }
                finally {
                    try {
                        if (source_19_1 && !source_19_1.done && (_a = source_19.return)) yield __await(_a.call(source_19));
                    }
                    finally { if (e_19) throw e_19.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    /**
     * @throws {ArgumentOutOfRangeException}
     */
    static elementAt(source, index) {
        var source_20, source_20_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_20, _a;
            let i = 0;
            try {
                for (source_20 = __asyncValues(source); source_20_1 = yield source_20.next(), !source_20_1.done;) {
                    const item = yield source_20_1.value;
                    if (index === i++) {
                        return item;
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (source_20_1 && !source_20_1.done && (_a = source_20.return)) yield _a.call(source_20);
                }
                finally { if (e_20) throw e_20.error; }
            }
            throw new shared_1.ArgumentOutOfRangeException("index");
        });
    }
    static elementAtOrDefault(source, index) {
        var source_21, source_21_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_21, _a;
            let i = 0;
            try {
                for (source_21 = __asyncValues(source); source_21_1 = yield source_21.next(), !source_21_1.done;) {
                    const item = yield source_21_1.value;
                    if (index === i++) {
                        return item;
                    }
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (source_21_1 && !source_21_1.done && (_a = source_21.return)) yield _a.call(source_21);
                }
                finally { if (e_21) throw e_21.error; }
            }
            return null;
        });
    }
    static empty() {
        function iterable() {
            return __asyncGenerator(this, arguments, function* iterable_1() {
                var e_22, _a;
                try {
                    for (var _b = __asyncValues([]), _c; _c = yield __await(_b.next()), !_c.done;) {
                        const _ = yield yield __await(__await(_c.value));
                        yield yield __await(_);
                    }
                }
                catch (e_22_1) { e_22 = { error: e_22_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                    }
                    finally { if (e_22) throw e_22.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterable);
    }
    static enumerateObject(source) {
        function iterable() {
            return __asyncGenerator(this, arguments, function* iterable_2() {
                /* tslint:disable */
                for (const key in source) {
                    yield yield __await({
                        first: key,
                        second: source[key]
                    });
                }
                /* tslint:enable */
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterable);
    }
    static except(first, second, comparer = shared_1.EqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_4() {
                var e_23, _a, e_24, _b;
                // TODO: async eq of [...second] ?
                const secondArray = [];
                try {
                    for (var second_1 = __asyncValues(second), second_1_1; second_1_1 = yield __await(second_1.next()), !second_1_1.done;) {
                        const x = yield yield __await(__await(second_1_1.value));
                        secondArray.push(x);
                    }
                }
                catch (e_23_1) { e_23 = { error: e_23_1 }; }
                finally {
                    try {
                        if (second_1_1 && !second_1_1.done && (_a = second_1.return)) yield __await(_a.call(second_1));
                    }
                    finally { if (e_23) throw e_23.error; }
                }
                try {
                    for (var first_3 = __asyncValues(first), first_3_1; first_3_1 = yield __await(first_3.next()), !first_3_1.done;) {
                        const firstItem = yield yield __await(__await(first_3_1.value));
                        let exists = false;
                        for (let j = 0; j < secondArray.length; j++) {
                            const secondItem = secondArray[j];
                            if (comparer(firstItem, secondItem) === true) {
                                exists = true;
                                break;
                            }
                        }
                        if (exists === false) {
                            yield yield __await(firstItem);
                        }
                    }
                }
                catch (e_24_1) { e_24 = { error: e_24_1 }; }
                finally {
                    try {
                        if (first_3_1 && !first_3_1.done && (_b = first_3.return)) yield __await(_b.call(first_3));
                    }
                    finally { if (e_24) throw e_24.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static exceptAsync(first, second, comparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_5() {
                var e_25, _a, e_26, _b;
                // TODO: async eq of [...second] ?
                const secondArray = [];
                try {
                    for (var second_2 = __asyncValues(second), second_2_1; second_2_1 = yield __await(second_2.next()), !second_2_1.done;) {
                        const x = yield yield __await(__await(second_2_1.value));
                        secondArray.push(x);
                    }
                }
                catch (e_25_1) { e_25 = { error: e_25_1 }; }
                finally {
                    try {
                        if (second_2_1 && !second_2_1.done && (_a = second_2.return)) yield __await(_a.call(second_2));
                    }
                    finally { if (e_25) throw e_25.error; }
                }
                try {
                    for (var first_4 = __asyncValues(first), first_4_1; first_4_1 = yield __await(first_4.next()), !first_4_1.done;) {
                        const firstItem = yield yield __await(__await(first_4_1.value));
                        let exists = false;
                        for (let j = 0; j < secondArray.length; j++) {
                            const secondItem = secondArray[j];
                            if ((yield __await(comparer(firstItem, secondItem))) === true) {
                                exists = true;
                                break;
                            }
                        }
                        if (exists === false) {
                            yield yield __await(firstItem);
                        }
                    }
                }
                catch (e_26_1) { e_26 = { error: e_26_1 }; }
                finally {
                    try {
                        if (first_4_1 && !first_4_1.done && (_b = first_4.return)) yield __await(_b.call(first_4));
                    }
                    finally { if (e_26) throw e_26.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    /**
     * @throws {InvalidOperationException} There are no elements
     */
    static first(source, predicate) {
        if (predicate) {
            return AsyncEnumerable.first_2(source, predicate);
        }
        else {
            return AsyncEnumerable.first_1(source);
        }
    }
    static first_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const first = yield source[Symbol.asyncIterator]().next();
            if (first.done === true) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return first.value;
        });
    }
    static first_2(source, predicate) {
        var source_22, source_22_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_27, _a;
            try {
                for (source_22 = __asyncValues(source); source_22_1 = yield source_22.next(), !source_22_1.done;) {
                    const value = yield source_22_1.value;
                    if (predicate(value) === true) {
                        return value;
                    }
                }
            }
            catch (e_27_1) { e_27 = { error: e_27_1 }; }
            finally {
                try {
                    if (source_22_1 && !source_22_1.done && (_a = source_22.return)) yield _a.call(source_22);
                }
                finally { if (e_27) throw e_27.error; }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    /**
     * @throws {InvalidOperationException} There are no elements matching predicate
     */
    static firstAsync(source, predicate) {
        var source_23, source_23_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_28, _a;
            try {
                for (source_23 = __asyncValues(source); source_23_1 = yield source_23.next(), !source_23_1.done;) {
                    const value = yield source_23_1.value;
                    if ((yield predicate(value)) === true) {
                        return value;
                    }
                }
            }
            catch (e_28_1) { e_28 = { error: e_28_1 }; }
            finally {
                try {
                    if (source_23_1 && !source_23_1.done && (_a = source_23.return)) yield _a.call(source_23);
                }
                finally { if (e_28) throw e_28.error; }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    static firstOrDefault(source, predicate) {
        if (predicate) {
            return AsyncEnumerable.firstOrDefault_2(source, predicate);
        }
        else {
            return AsyncEnumerable.firstOrDefault_1(source);
        }
    }
    static firstOrDefault_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const first = yield source[Symbol.asyncIterator]().next();
            return first.value || null;
        });
    }
    static firstOrDefault_2(source, predicate) {
        var source_24, source_24_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_29, _a;
            try {
                for (source_24 = __asyncValues(source); source_24_1 = yield source_24.next(), !source_24_1.done;) {
                    const value = yield source_24_1.value;
                    if (predicate(value) === true) {
                        return value;
                    }
                }
            }
            catch (e_29_1) { e_29 = { error: e_29_1 }; }
            finally {
                try {
                    if (source_24_1 && !source_24_1.done && (_a = source_24.return)) yield _a.call(source_24);
                }
                finally { if (e_29) throw e_29.error; }
            }
            return null;
        });
    }
    static firstOrDefaultAsync(source, predicate) {
        var source_25, source_25_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_30, _a;
            try {
                for (source_25 = __asyncValues(source); source_25_1 = yield source_25.next(), !source_25_1.done;) {
                    const value = yield source_25_1.value;
                    if ((yield predicate(value)) === true) {
                        return value;
                    }
                }
            }
            catch (e_30_1) { e_30 = { error: e_30_1 }; }
            finally {
                try {
                    if (source_25_1 && !source_25_1.done && (_a = source_25.return)) yield _a.call(source_25);
                }
                finally { if (e_30) throw e_30.error; }
            }
            return null;
        });
    }
    static flatten(source, shallow) {
        function iterator(sourceInner) {
            return __asyncGenerator(this, arguments, function* iterator_6() {
                var e_31, _a, e_32, _b;
                try {
                    for (var sourceInner_1 = __asyncValues(sourceInner), sourceInner_1_1; sourceInner_1_1 = yield __await(sourceInner_1.next()), !sourceInner_1_1.done;) {
                        const item = yield yield __await(__await(sourceInner_1_1.value));
                        if (item[Symbol.asyncIterator] !== undefined) {
                            const items = shallow ? item : iterator(item);
                            try {
                                for (var items_1 = __asyncValues(items), items_1_1; items_1_1 = yield __await(items_1.next()), !items_1_1.done;) {
                                    const inner = yield yield __await(__await(items_1_1.value));
                                    yield yield __await(inner);
                                }
                            }
                            catch (e_32_1) { e_32 = { error: e_32_1 }; }
                            finally {
                                try {
                                    if (items_1_1 && !items_1_1.done && (_b = items_1.return)) yield __await(_b.call(items_1));
                                }
                                finally { if (e_32) throw e_32.error; }
                            }
                        }
                        else {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_31_1) { e_31 = { error: e_31_1 }; }
                finally {
                    try {
                        if (sourceInner_1_1 && !sourceInner_1_1.done && (_a = sourceInner_1.return)) yield __await(_a.call(sourceInner_1));
                    }
                    finally { if (e_31) throw e_31.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(() => iterator(source));
    }
    static from(promisesOrIterable) {
        if (Array.isArray(promisesOrIterable)) {
            if (promisesOrIterable.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(function () {
                return __asyncGenerator(this, arguments, function* () {
                    var e_33, _a;
                    try {
                        for (var promisesOrIterable_1 = __asyncValues(promisesOrIterable), promisesOrIterable_1_1; promisesOrIterable_1_1 = yield __await(promisesOrIterable_1.next()), !promisesOrIterable_1_1.done;) {
                            const value = yield yield __await(__await(promisesOrIterable_1_1.value));
                            yield yield __await(value);
                        }
                    }
                    catch (e_33_1) { e_33 = { error: e_33_1 }; }
                    finally {
                        try {
                            if (promisesOrIterable_1_1 && !promisesOrIterable_1_1.done && (_a = promisesOrIterable_1.return)) yield __await(_a.call(promisesOrIterable_1));
                        }
                        finally { if (e_33) throw e_33.error; }
                    }
                });
            });
        }
        else {
            return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(promisesOrIterable);
        }
    }
    static fromEvent(element, type) {
        function eventGenerator() {
            return __asyncGenerator(this, arguments, function* eventGenerator_1() {
                let resolve;
                const nextPromise = () => new Promise((r) => resolve = r);
                let promise = nextPromise();
                element.addEventListener(type, (e) => {
                    resolve(e);
                    promise = nextPromise();
                });
                yield yield __await(yield __await(promise));
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(eventGenerator);
    }
    static each(source, action) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_7() {
                var e_34, _a;
                try {
                    for (var source_26 = __asyncValues(source), source_26_1; source_26_1 = yield __await(source_26.next()), !source_26_1.done;) {
                        const value = yield yield __await(__await(source_26_1.value));
                        action(value);
                        yield yield __await(value);
                    }
                }
                catch (e_34_1) { e_34 = { error: e_34_1 }; }
                finally {
                    try {
                        if (source_26_1 && !source_26_1.done && (_a = source_26.return)) yield __await(_a.call(source_26));
                    }
                    finally { if (e_34) throw e_34.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static eachAsync(source, action) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_8() {
                var e_35, _a;
                try {
                    for (var source_27 = __asyncValues(source), source_27_1; source_27_1 = yield __await(source_27.next()), !source_27_1.done;) {
                        const value = yield yield __await(__await(source_27_1.value));
                        yield __await(action(value));
                        yield yield __await(value);
                    }
                }
                catch (e_35_1) { e_35 = { error: e_35_1 }; }
                finally {
                    try {
                        if (source_27_1 && !source_27_1.done && (_a = source_27.return)) yield __await(_a.call(source_27));
                    }
                    finally { if (e_35) throw e_35.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static groupBy(source, keySelector, comparer) {
        if (comparer) {
            return AsyncEnumerable.groupBy_0(source, keySelector, comparer);
        }
        else {
            return AsyncEnumerable.groupBy_0_Simple(source, keySelector);
        }
    }
    static groupBy_0_Simple(source, keySelector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_9() {
                var e_36, _a;
                const keyMap = {};
                try {
                    for (var source_28 = __asyncValues(source), source_28_1; source_28_1 = yield __await(source_28.next()), !source_28_1.done;) {
                        const value = yield yield __await(__await(source_28_1.value));
                        const key = keySelector(value);
                        const grouping = keyMap[key];
                        if (grouping) {
                            grouping.push(value);
                        }
                        else {
                            keyMap[key] = new sync_1.Grouping(key, value);
                        }
                    }
                }
                catch (e_36_1) { e_36 = { error: e_36_1 }; }
                finally {
                    try {
                        if (source_28_1 && !source_28_1.done && (_a = source_28.return)) yield __await(_a.call(source_28));
                    }
                    finally { if (e_36) throw e_36.error; }
                }
                // tslint:disable-next-line:forin
                for (const value in keyMap) {
                    yield yield __await(keyMap[value]);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static groupBy_0(source, keySelector, comparer) {
        function generate() {
            return __asyncGenerator(this, arguments, function* generate_1() {
                var e_37, _a;
                const keyMap = new Array();
                try {
                    for (var source_29 = __asyncValues(source), source_29_1; source_29_1 = yield __await(source_29.next()), !source_29_1.done;) {
                        const value = yield yield __await(__await(source_29_1.value));
                        const key = keySelector(value);
                        let found = false;
                        for (let i = 0; i < keyMap.length; i++) {
                            const group = keyMap[i];
                            if (comparer(group.key, key)) {
                                group.push(value);
                                found = true;
                                break;
                            }
                        }
                        if (found === false) {
                            keyMap.push(new sync_1.Grouping(key, value));
                        }
                    }
                }
                catch (e_37_1) { e_37 = { error: e_37_1 }; }
                finally {
                    try {
                        if (source_29_1 && !source_29_1.done && (_a = source_29.return)) yield __await(_a.call(source_29));
                    }
                    finally { if (e_37) throw e_37.error; }
                }
                for (const g of keyMap) {
                    yield yield __await(g);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
    }
    static groupByAsync(source, keySelector, comparer) {
        if (comparer) {
            return AsyncEnumerable.groupByAsync_0(source, keySelector, comparer);
        }
        else {
            return AsyncEnumerable.groupByAsync_0_Simple(source, keySelector);
        }
    }
    static groupByAsync_0_Simple(source, keySelector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_10() {
                var e_38, _a;
                const keyMap = {};
                try {
                    for (var source_30 = __asyncValues(source), source_30_1; source_30_1 = yield __await(source_30.next()), !source_30_1.done;) {
                        const value = yield yield __await(__await(source_30_1.value));
                        const key = yield __await(keySelector(value));
                        const grouping = keyMap[key];
                        if (grouping) {
                            grouping.push(value);
                        }
                        else {
                            keyMap[key] = new sync_1.Grouping(key, value);
                        }
                    }
                }
                catch (e_38_1) { e_38 = { error: e_38_1 }; }
                finally {
                    try {
                        if (source_30_1 && !source_30_1.done && (_a = source_30.return)) yield __await(_a.call(source_30));
                    }
                    finally { if (e_38) throw e_38.error; }
                }
                // tslint:disable-next-line:forin
                for (const value in keyMap) {
                    yield yield __await(keyMap[value]);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static groupByAsync_0(source, keySelector, comparer) {
        function generate() {
            return __asyncGenerator(this, arguments, function* generate_2() {
                var e_39, _a;
                const keyMap = new Array();
                try {
                    for (var source_31 = __asyncValues(source), source_31_1; source_31_1 = yield __await(source_31.next()), !source_31_1.done;) {
                        const value = yield yield __await(__await(source_31_1.value));
                        const key = yield __await(keySelector(value));
                        let found = false;
                        for (let i = 0; i < keyMap.length; i++) {
                            const group = keyMap[i];
                            if ((yield __await(comparer(group.key, key))) === true) {
                                group.push(value);
                                found = true;
                                break;
                            }
                        }
                        if (found === false) {
                            keyMap.push(new sync_1.Grouping(key, value));
                        }
                    }
                }
                catch (e_39_1) { e_39 = { error: e_39_1 }; }
                finally {
                    try {
                        if (source_31_1 && !source_31_1.done && (_a = source_31.return)) yield __await(_a.call(source_31));
                    }
                    finally { if (e_39) throw e_39.error; }
                }
                for (const keyValue of keyMap) {
                    yield yield __await(keyValue);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
    }
    static groupByWithSel(source, keySelector, elementSelector, comparer) {
        if (comparer) {
            return AsyncEnumerable.groupBy_1(source, keySelector, elementSelector, comparer);
        }
        else {
            return AsyncEnumerable.groupBy_1_Simple(source, keySelector, elementSelector);
        }
    }
    static groupBy_1_Simple(source, keySelector, elementSelector) {
        function generate() {
            return __asyncGenerator(this, arguments, function* generate_3() {
                var e_40, _a;
                const keyMap = {};
                try {
                    for (var source_32 = __asyncValues(source), source_32_1; source_32_1 = yield __await(source_32.next()), !source_32_1.done;) {
                        const value = yield yield __await(__await(source_32_1.value));
                        const key = keySelector(value);
                        const grouping = keyMap[key];
                        const element = elementSelector(value);
                        if (grouping) {
                            grouping.push(element);
                        }
                        else {
                            keyMap[key] = new sync_1.Grouping(key, element);
                        }
                    }
                }
                catch (e_40_1) { e_40 = { error: e_40_1 }; }
                finally {
                    try {
                        if (source_32_1 && !source_32_1.done && (_a = source_32.return)) yield __await(_a.call(source_32));
                    }
                    finally { if (e_40) throw e_40.error; }
                }
                /* tslint:disable:forin */
                for (const value in keyMap) {
                    yield yield __await(keyMap[value]);
                }
                /* tslint:enable */
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
    }
    static groupBy_1(source, keySelector, elementSelector, comparer) {
        function generate() {
            return __asyncGenerator(this, arguments, function* generate_4() {
                var e_41, _a;
                const keyMap = new Array();
                try {
                    for (var source_33 = __asyncValues(source), source_33_1; source_33_1 = yield __await(source_33.next()), !source_33_1.done;) {
                        const value = yield yield __await(__await(source_33_1.value));
                        const key = keySelector(value);
                        let found = false;
                        for (let i = 0; i < keyMap.length; i++) {
                            const group = keyMap[i];
                            if (comparer(group.key, key)) {
                                group.push(elementSelector(value));
                                found = true;
                                break;
                            }
                        }
                        if (found === false) {
                            const element = elementSelector(value);
                            keyMap.push(new sync_1.Grouping(key, element));
                        }
                    }
                }
                catch (e_41_1) { e_41 = { error: e_41_1 }; }
                finally {
                    try {
                        if (source_33_1 && !source_33_1.done && (_a = source_33.return)) yield __await(_a.call(source_33));
                    }
                    finally { if (e_41) throw e_41.error; }
                }
                for (const value of keyMap) {
                    yield yield __await(value);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generate);
    }
    static join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_11() {
                var e_42, _a, e_43, _b;
                const innerArray = [];
                try {
                    for (var inner_1 = __asyncValues(inner), inner_1_1; inner_1_1 = yield __await(inner_1.next()), !inner_1_1.done;) {
                        const i = yield yield __await(__await(inner_1_1.value));
                        innerArray.push(i);
                    }
                }
                catch (e_42_1) { e_42 = { error: e_42_1 }; }
                finally {
                    try {
                        if (inner_1_1 && !inner_1_1.done && (_a = inner_1.return)) yield __await(_a.call(inner_1));
                    }
                    finally { if (e_42) throw e_42.error; }
                }
                try {
                    for (var outer_1 = __asyncValues(outer), outer_1_1; outer_1_1 = yield __await(outer_1.next()), !outer_1_1.done;) {
                        const o = yield yield __await(__await(outer_1_1.value));
                        const outerKey = outerKeySelector(o);
                        for (const i of innerArray) {
                            const innerKey = innerKeySelector(i);
                            if (comparer(outerKey, innerKey) === true) {
                                yield yield __await(resultSelector(o, i));
                            }
                        }
                    }
                }
                catch (e_43_1) { e_43 = { error: e_43_1 }; }
                finally {
                    try {
                        if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) yield __await(_b.call(outer_1));
                    }
                    finally { if (e_43) throw e_43.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static intersect(first, second, comparer = shared_1.StrictEqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_12() {
                const firstResults = yield __await(first.distinct(comparer).toArray());
                if (firstResults.length === 0) {
                    return;
                }
                const secondResults = yield __await(second.toArray());
                for (let i = 0; i < firstResults.length; i++) {
                    const firstValue = firstResults[i];
                    for (let j = 0; j < secondResults.length; j++) {
                        const secondValue = secondResults[j];
                        if (comparer(firstValue, secondValue) === true) {
                            yield yield __await(firstValue);
                            break;
                        }
                    }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static intersectAsync(first, second, comparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_13() {
                const firstResults = yield __await(first.distinctAsync(comparer).toArray());
                if (firstResults.length === 0) {
                    return;
                }
                const secondResults = yield __await(second.toArray());
                for (let i = 0; i < firstResults.length; i++) {
                    const firstValue = firstResults[i];
                    for (let j = 0; j < secondResults.length; j++) {
                        const secondValue = secondResults[j];
                        if ((yield __await(comparer(firstValue, secondValue))) === true) {
                            yield yield __await(firstValue);
                            break;
                        }
                    }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static select(source, selector) {
        if (typeof selector === "string") {
            return AsyncEnumerable.select_2(source, selector);
        }
        else {
            return AsyncEnumerable.select_1(source, selector);
        }
    }
    static select_1(source, selector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_14() {
                var e_44, _a;
                try {
                    for (var source_34 = __asyncValues(source), source_34_1; source_34_1 = yield __await(source_34.next()), !source_34_1.done;) {
                        const value = yield yield __await(__await(source_34_1.value));
                        yield yield __await(selector(value));
                    }
                }
                catch (e_44_1) { e_44 = { error: e_44_1 }; }
                finally {
                    try {
                        if (source_34_1 && !source_34_1.done && (_a = source_34.return)) yield __await(_a.call(source_34));
                    }
                    finally { if (e_44) throw e_44.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static select_2(source, key) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_15() {
                var e_45, _a;
                try {
                    for (var source_35 = __asyncValues(source), source_35_1; source_35_1 = yield __await(source_35.next()), !source_35_1.done;) {
                        const value = yield yield __await(__await(source_35_1.value));
                        yield yield __await(value[key]);
                    }
                }
                catch (e_45_1) { e_45 = { error: e_45_1 }; }
                finally {
                    try {
                        if (source_35_1 && !source_35_1.done && (_a = source_35.return)) yield __await(_a.call(source_35));
                    }
                    finally { if (e_45) throw e_45.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static selectAsync(source, selector) {
        if (typeof selector === "string") {
            return AsyncEnumerable.selectAsync_2(source, selector);
        }
        else {
            return AsyncEnumerable.selectAsync_1(source, selector);
        }
    }
    static selectAsync_1(source, selector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_16() {
                var e_46, _a;
                try {
                    for (var source_36 = __asyncValues(source), source_36_1; source_36_1 = yield __await(source_36.next()), !source_36_1.done;) {
                        const value = yield yield __await(__await(source_36_1.value));
                        yield yield __await(selector(value));
                    }
                }
                catch (e_46_1) { e_46 = { error: e_46_1 }; }
                finally {
                    try {
                        if (source_36_1 && !source_36_1.done && (_a = source_36.return)) yield __await(_a.call(source_36));
                    }
                    finally { if (e_46) throw e_46.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static selectAsync_2(source, key) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_17() {
                var e_47, _a;
                try {
                    for (var source_37 = __asyncValues(source), source_37_1; source_37_1 = yield __await(source_37.next()), !source_37_1.done;) {
                        const value = yield yield __await(__await(source_37_1.value));
                        yield yield __await(value[key]);
                    }
                }
                catch (e_47_1) { e_47 = { error: e_47_1 }; }
                finally {
                    try {
                        if (source_37_1 && !source_37_1.done && (_a = source_37.return)) yield __await(_a.call(source_37));
                    }
                    finally { if (e_47) throw e_47.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static selectMany(source, selector) {
        if (typeof selector === "string") {
            return AsyncEnumerable.selectMany_2(source, selector);
        }
        else {
            return AsyncEnumerable.selectMany_1(source, selector);
        }
    }
    static selectMany_1(source, selector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_18() {
                var e_48, _a;
                try {
                    for (var source_38 = __asyncValues(source), source_38_1; source_38_1 = yield __await(source_38.next()), !source_38_1.done;) {
                        const value = yield yield __await(__await(source_38_1.value));
                        for (const selectorValue of selector(value)) {
                            yield yield __await(selectorValue);
                        }
                    }
                }
                catch (e_48_1) { e_48 = { error: e_48_1 }; }
                finally {
                    try {
                        if (source_38_1 && !source_38_1.done && (_a = source_38.return)) yield __await(_a.call(source_38));
                    }
                    finally { if (e_48) throw e_48.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static selectMany_2(source, selector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_19() {
                var e_49, _a;
                try {
                    for (var source_39 = __asyncValues(source), source_39_1; source_39_1 = yield __await(source_39.next()), !source_39_1.done;) {
                        const value = yield yield __await(__await(source_39_1.value));
                        for (const selectorValue of value[selector]) {
                            yield yield __await(selectorValue);
                        }
                    }
                }
                catch (e_49_1) { e_49 = { error: e_49_1 }; }
                finally {
                    try {
                        if (source_39_1 && !source_39_1.done && (_a = source_39.return)) yield __await(_a.call(source_39));
                    }
                    finally { if (e_49) throw e_49.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static selectManyAsync(source, selector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_20() {
                var e_50, _a;
                try {
                    for (var source_40 = __asyncValues(source), source_40_1; source_40_1 = yield __await(source_40.next()), !source_40_1.done;) {
                        const value = yield yield __await(__await(source_40_1.value));
                        const many = yield __await(selector(value));
                        for (const innerValue of many) {
                            yield yield __await(innerValue);
                        }
                    }
                }
                catch (e_50_1) { e_50 = { error: e_50_1 }; }
                finally {
                    try {
                        if (source_40_1 && !source_40_1.done && (_a = source_40.return)) yield __await(_a.call(source_40));
                    }
                    finally { if (e_50) throw e_50.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    /**
     * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
     */
    static single(source, predicate) {
        if (predicate) {
            return AsyncEnumerable.single_2(source, predicate);
        }
        else {
            return AsyncEnumerable.single_1(source);
        }
    }
    static single_1(source) {
        var source_41, source_41_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_51, _a;
            let hasValue = false;
            let singleValue = null;
            try {
                for (source_41 = __asyncValues(source); source_41_1 = yield source_41.next(), !source_41_1.done;) {
                    const value = yield source_41_1.value;
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                    }
                    else {
                        hasValue = true;
                        singleValue = value;
                    }
                }
            }
            catch (e_51_1) { e_51 = { error: e_51_1 }; }
            finally {
                try {
                    if (source_41_1 && !source_41_1.done && (_a = source_41.return)) yield _a.call(source_41);
                }
                finally { if (e_51) throw e_51.error; }
            }
            if (hasValue === false) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return singleValue;
        });
    }
    static single_2(source, predicate) {
        var source_42, source_42_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_52, _a;
            let hasValue = false;
            let singleValue = null;
            try {
                for (source_42 = __asyncValues(source); source_42_1 = yield source_42.next(), !source_42_1.done;) {
                    const value = yield source_42_1.value;
                    if (predicate(value)) {
                        if (hasValue === true) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneMatchingElement);
                        }
                        else {
                            hasValue = true;
                            singleValue = value;
                        }
                    }
                }
            }
            catch (e_52_1) { e_52 = { error: e_52_1 }; }
            finally {
                try {
                    if (source_42_1 && !source_42_1.done && (_a = source_42.return)) yield _a.call(source_42);
                }
                finally { if (e_52) throw e_52.error; }
            }
            if (hasValue === false) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            }
            return singleValue;
        });
    }
    /**
     * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
     */
    static singleAsync(source, predicate) {
        var source_43, source_43_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_53, _a;
            let hasValue = false;
            let singleValue = null;
            try {
                for (source_43 = __asyncValues(source); source_43_1 = yield source_43.next(), !source_43_1.done;) {
                    const value = yield source_43_1.value;
                    if (yield predicate(value)) {
                        if (hasValue === true) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneMatchingElement);
                        }
                        else {
                            hasValue = true;
                            singleValue = value;
                        }
                    }
                }
            }
            catch (e_53_1) { e_53 = { error: e_53_1 }; }
            finally {
                try {
                    if (source_43_1 && !source_43_1.done && (_a = source_43.return)) yield _a.call(source_43);
                }
                finally { if (e_53) throw e_53.error; }
            }
            if (hasValue === false) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            }
            return singleValue;
        });
    }
    static singleOrDefault(source, predicate) {
        if (predicate) {
            return AsyncEnumerable.singleOrDefault_2(source, predicate);
        }
        else {
            return AsyncEnumerable.singleOrDefault_1(source);
        }
    }
    static singleOrDefault_1(source) {
        var source_44, source_44_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_54, _a;
            let hasValue = false;
            let singleValue = null;
            try {
                for (source_44 = __asyncValues(source); source_44_1 = yield source_44.next(), !source_44_1.done;) {
                    const value = yield source_44_1.value;
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                    }
                    else {
                        hasValue = true;
                        singleValue = value;
                    }
                }
            }
            catch (e_54_1) { e_54 = { error: e_54_1 }; }
            finally {
                try {
                    if (source_44_1 && !source_44_1.done && (_a = source_44.return)) yield _a.call(source_44);
                }
                finally { if (e_54) throw e_54.error; }
            }
            return singleValue;
        });
    }
    static singleOrDefault_2(source, predicate) {
        var source_45, source_45_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_55, _a;
            let hasValue = false;
            let singleValue = null;
            try {
                for (source_45 = __asyncValues(source); source_45_1 = yield source_45.next(), !source_45_1.done;) {
                    const value = yield source_45_1.value;
                    if (predicate(value)) {
                        if (hasValue === true) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneMatchingElement);
                        }
                        else {
                            hasValue = true;
                            singleValue = value;
                        }
                    }
                }
            }
            catch (e_55_1) { e_55 = { error: e_55_1 }; }
            finally {
                try {
                    if (source_45_1 && !source_45_1.done && (_a = source_45.return)) yield _a.call(source_45);
                }
                finally { if (e_55) throw e_55.error; }
            }
            return singleValue;
        });
    }
    static singleOrDefaultAsync(source, predicate) {
        var source_46, source_46_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_56, _a;
            let hasValue = false;
            let singleValue = null;
            try {
                for (source_46 = __asyncValues(source); source_46_1 = yield source_46.next(), !source_46_1.done;) {
                    const value = yield source_46_1.value;
                    if (yield predicate(value)) {
                        if (hasValue === true) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneMatchingElement);
                        }
                        else {
                            hasValue = true;
                            singleValue = value;
                        }
                    }
                }
            }
            catch (e_56_1) { e_56 = { error: e_56_1 }; }
            finally {
                try {
                    if (source_46_1 && !source_46_1.done && (_a = source_46.return)) yield _a.call(source_46);
                }
                finally { if (e_56) throw e_56.error; }
            }
            return singleValue;
        });
    }
    static skip(source, count) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_21() {
                var e_57, _a;
                let i = 0;
                try {
                    for (var source_47 = __asyncValues(source), source_47_1; source_47_1 = yield __await(source_47.next()), !source_47_1.done;) {
                        const item = yield yield __await(__await(source_47_1.value));
                        if (i++ >= count) {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_57_1) { e_57 = { error: e_57_1 }; }
                finally {
                    try {
                        if (source_47_1 && !source_47_1.done && (_a = source_47.return)) yield __await(_a.call(source_47));
                    }
                    finally { if (e_57) throw e_57.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static skipWhile(source, predicate) {
        if (predicate.length === 1) {
            return AsyncEnumerable.skipWhile_1(source, predicate);
        }
        else {
            return AsyncEnumerable.skipWhile_2(source, predicate);
        }
    }
    static skipWhile_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_22() {
                var e_58, _a;
                let skip = true;
                try {
                    for (var source_48 = __asyncValues(source), source_48_1; source_48_1 = yield __await(source_48.next()), !source_48_1.done;) {
                        const item = yield yield __await(__await(source_48_1.value));
                        if (skip === false) {
                            yield yield __await(item);
                        }
                        else if (predicate(item) === false) {
                            skip = false;
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_58_1) { e_58 = { error: e_58_1 }; }
                finally {
                    try {
                        if (source_48_1 && !source_48_1.done && (_a = source_48.return)) yield __await(_a.call(source_48));
                    }
                    finally { if (e_58) throw e_58.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static skipWhile_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_23() {
                var e_59, _a;
                let index = 0;
                let skip = true;
                try {
                    for (var source_49 = __asyncValues(source), source_49_1; source_49_1 = yield __await(source_49.next()), !source_49_1.done;) {
                        const item = yield yield __await(__await(source_49_1.value));
                        if (skip === false) {
                            yield yield __await(item);
                        }
                        else if (predicate(item, index) === false) {
                            skip = false;
                            yield yield __await(item);
                        }
                        index++;
                    }
                }
                catch (e_59_1) { e_59 = { error: e_59_1 }; }
                finally {
                    try {
                        if (source_49_1 && !source_49_1.done && (_a = source_49.return)) yield __await(_a.call(source_49));
                    }
                    finally { if (e_59) throw e_59.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static skipWhileAsync(source, predicate) {
        if (predicate.length === 1) {
            return AsyncEnumerable.skipWhileAsync_1(source, predicate);
        }
        else {
            return AsyncEnumerable.skipWhileAsync_2(source, predicate);
        }
    }
    static skipWhileAsync_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_24() {
                var e_60, _a;
                let skip = true;
                try {
                    for (var source_50 = __asyncValues(source), source_50_1; source_50_1 = yield __await(source_50.next()), !source_50_1.done;) {
                        const item = yield yield __await(__await(source_50_1.value));
                        if (skip === false) {
                            yield yield __await(item);
                        }
                        else if ((yield __await(predicate(item))) === false) {
                            skip = false;
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_60_1) { e_60 = { error: e_60_1 }; }
                finally {
                    try {
                        if (source_50_1 && !source_50_1.done && (_a = source_50.return)) yield __await(_a.call(source_50));
                    }
                    finally { if (e_60) throw e_60.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static skipWhileAsync_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_25() {
                var e_61, _a;
                let index = 0;
                let skip = true;
                try {
                    for (var source_51 = __asyncValues(source), source_51_1; source_51_1 = yield __await(source_51.next()), !source_51_1.done;) {
                        const item = yield yield __await(__await(source_51_1.value));
                        if (skip === false) {
                            yield yield __await(item);
                        }
                        else if ((yield __await(predicate(item, index))) === false) {
                            skip = false;
                            yield yield __await(item);
                        }
                        index++;
                    }
                }
                catch (e_61_1) { e_61 = { error: e_61_1 }; }
                finally {
                    try {
                        if (source_51_1 && !source_51_1.done && (_a = source_51.return)) yield __await(_a.call(source_51));
                    }
                    finally { if (e_61) throw e_61.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static ofType(source, type) {
        const typeCheck = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof type);
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_26() {
                var e_62, _a;
                try {
                    for (var source_52 = __asyncValues(source), source_52_1; source_52_1 = yield __await(source_52.next()), !source_52_1.done;) {
                        const item = yield yield __await(__await(source_52_1.value));
                        if (typeCheck(item)) {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_62_1) { e_62 = { error: e_62_1 }; }
                finally {
                    try {
                        if (source_52_1 && !source_52_1.done && (_a = source_52.return)) yield __await(_a.call(source_52));
                    }
                    finally { if (e_62) throw e_62.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static orderBy(source, keySelector, comparer) {
        return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generate(source, keySelector, true, comparer);
    }
    static orderByAsync(source, keySelector, comparer) {
        return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generateAsync(source, keySelector, true, comparer);
    }
    static orderByDescending(source, keySelector, comparer) {
        return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generate(source, keySelector, false, comparer);
    }
    static orderByDescendingAsync(source, keySelector, comparer) {
        return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generateAsync(source, keySelector, false, comparer);
    }
    /**
     * @throws {InvalidOperationException} No Elements / No Match
     */
    static last(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate) {
                return AsyncEnumerable.last_2(source, predicate);
            }
            else {
                return AsyncEnumerable.last_1(source);
            }
        });
    }
    static last_1(source) {
        var source_53, source_53_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_63, _a;
            let last = null;
            try {
                for (source_53 = __asyncValues(source); source_53_1 = yield source_53.next(), !source_53_1.done;) {
                    const value = yield source_53_1.value;
                    last = value;
                }
            }
            catch (e_63_1) { e_63 = { error: e_63_1 }; }
            finally {
                try {
                    if (source_53_1 && !source_53_1.done && (_a = source_53.return)) yield _a.call(source_53);
                }
                finally { if (e_63) throw e_63.error; }
            }
            if (!last) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return last;
        });
    }
    static last_2(source, predicate) {
        var source_54, source_54_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_64, _a;
            let last = null;
            try {
                for (source_54 = __asyncValues(source); source_54_1 = yield source_54.next(), !source_54_1.done;) {
                    const value = yield source_54_1.value;
                    if (predicate(value) === true) {
                        last = value;
                    }
                }
            }
            catch (e_64_1) { e_64 = { error: e_64_1 }; }
            finally {
                try {
                    if (source_54_1 && !source_54_1.done && (_a = source_54.return)) yield _a.call(source_54);
                }
                finally { if (e_64) throw e_64.error; }
            }
            if (!last) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            }
            return last;
        });
    }
    /**
     * @throws {InvalidOperationException} No Elements / No Match
     */
    static lastAsync(source, predicate) {
        var source_55, source_55_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_65, _a;
            let last = null;
            try {
                for (source_55 = __asyncValues(source); source_55_1 = yield source_55.next(), !source_55_1.done;) {
                    const value = yield source_55_1.value;
                    if ((yield predicate(value)) === true) {
                        last = value;
                    }
                }
            }
            catch (e_65_1) { e_65 = { error: e_65_1 }; }
            finally {
                try {
                    if (source_55_1 && !source_55_1.done && (_a = source_55.return)) yield _a.call(source_55);
                }
                finally { if (e_65) throw e_65.error; }
            }
            if (!last) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            }
            return last;
        });
    }
    static lastOrDefault(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (predicate) {
                return AsyncEnumerable.lastOrDefault_2(source, predicate);
            }
            else {
                return AsyncEnumerable.lastOrDefault_1(source);
            }
        });
    }
    static lastOrDefault_1(source) {
        var source_56, source_56_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_66, _a;
            let last = null;
            try {
                for (source_56 = __asyncValues(source); source_56_1 = yield source_56.next(), !source_56_1.done;) {
                    const value = yield source_56_1.value;
                    last = value;
                }
            }
            catch (e_66_1) { e_66 = { error: e_66_1 }; }
            finally {
                try {
                    if (source_56_1 && !source_56_1.done && (_a = source_56.return)) yield _a.call(source_56);
                }
                finally { if (e_66) throw e_66.error; }
            }
            return last;
        });
    }
    static lastOrDefault_2(source, predicate) {
        var source_57, source_57_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_67, _a;
            let last = null;
            try {
                for (source_57 = __asyncValues(source); source_57_1 = yield source_57.next(), !source_57_1.done;) {
                    const value = yield source_57_1.value;
                    if (predicate(value) === true) {
                        last = value;
                    }
                }
            }
            catch (e_67_1) { e_67 = { error: e_67_1 }; }
            finally {
                try {
                    if (source_57_1 && !source_57_1.done && (_a = source_57.return)) yield _a.call(source_57);
                }
                finally { if (e_67) throw e_67.error; }
            }
            return last;
        });
    }
    static lastOrDefaultAsync(source, predicate) {
        var source_58, source_58_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_68, _a;
            let last = null;
            try {
                for (source_58 = __asyncValues(source); source_58_1 = yield source_58.next(), !source_58_1.done;) {
                    const value = yield source_58_1.value;
                    if ((yield predicate(value)) === true) {
                        last = value;
                    }
                }
            }
            catch (e_68_1) { e_68 = { error: e_68_1 }; }
            finally {
                try {
                    if (source_58_1 && !source_58_1.done && (_a = source_58.return)) yield _a.call(source_58);
                }
                finally { if (e_68) throw e_68.error; }
            }
            return last;
        });
    }
    static max(source, selector) {
        if (selector) {
            return AsyncEnumerable.max_2(source, selector);
        }
        else {
            return AsyncEnumerable.max_1(source);
        }
    }
    static max_1(source) {
        var source_59, source_59_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_69, _a;
            let max = null;
            try {
                for (source_59 = __asyncValues(source); source_59_1 = yield source_59.next(), !source_59_1.done;) {
                    const item = yield source_59_1.value;
                    max = Math.max(max || Number.NEGATIVE_INFINITY, item);
                }
            }
            catch (e_69_1) { e_69 = { error: e_69_1 }; }
            finally {
                try {
                    if (source_59_1 && !source_59_1.done && (_a = source_59.return)) yield _a.call(source_59);
                }
                finally { if (e_69) throw e_69.error; }
            }
            if (max === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return max;
            }
        });
    }
    static max_2(source, selector) {
        var source_60, source_60_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_70, _a;
            let max = null;
            try {
                for (source_60 = __asyncValues(source); source_60_1 = yield source_60.next(), !source_60_1.done;) {
                    const item = yield source_60_1.value;
                    max = Math.max(max || Number.NEGATIVE_INFINITY, selector(item));
                }
            }
            catch (e_70_1) { e_70 = { error: e_70_1 }; }
            finally {
                try {
                    if (source_60_1 && !source_60_1.done && (_a = source_60.return)) yield _a.call(source_60);
                }
                finally { if (e_70) throw e_70.error; }
            }
            if (max === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return max;
            }
        });
    }
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static maxAsync(source, selector) {
        var source_61, source_61_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_71, _a;
            let max = null;
            try {
                for (source_61 = __asyncValues(source); source_61_1 = yield source_61.next(), !source_61_1.done;) {
                    const item = yield source_61_1.value;
                    max = Math.max(max || Number.NEGATIVE_INFINITY, yield selector(item));
                }
            }
            catch (e_71_1) { e_71 = { error: e_71_1 }; }
            finally {
                try {
                    if (source_61_1 && !source_61_1.done && (_a = source_61.return)) yield _a.call(source_61);
                }
                finally { if (e_71) throw e_71.error; }
            }
            if (max === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return max;
            }
        });
    }
    static min(source, selector) {
        if (selector) {
            return AsyncEnumerable.min_2(source, selector);
        }
        else {
            return AsyncEnumerable.min_1(source);
        }
    }
    static min_1(source) {
        var source_62, source_62_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_72, _a;
            let min = null;
            try {
                for (source_62 = __asyncValues(source); source_62_1 = yield source_62.next(), !source_62_1.done;) {
                    const item = yield source_62_1.value;
                    min = Math.min(min || Number.POSITIVE_INFINITY, item);
                }
            }
            catch (e_72_1) { e_72 = { error: e_72_1 }; }
            finally {
                try {
                    if (source_62_1 && !source_62_1.done && (_a = source_62.return)) yield _a.call(source_62);
                }
                finally { if (e_72) throw e_72.error; }
            }
            if (min === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return min;
            }
        });
    }
    static min_2(source, selector) {
        var source_63, source_63_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_73, _a;
            let min = null;
            try {
                for (source_63 = __asyncValues(source); source_63_1 = yield source_63.next(), !source_63_1.done;) {
                    const item = yield source_63_1.value;
                    min = Math.min(min || Number.POSITIVE_INFINITY, selector(item));
                }
            }
            catch (e_73_1) { e_73 = { error: e_73_1 }; }
            finally {
                try {
                    if (source_63_1 && !source_63_1.done && (_a = source_63.return)) yield _a.call(source_63);
                }
                finally { if (e_73) throw e_73.error; }
            }
            if (min === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return min;
            }
        });
    }
    /**
     * @throws {InvalidOperationException} No Matching Elements
     */
    static minAsync(source, selector) {
        var source_64, source_64_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_74, _a;
            let min = null;
            try {
                for (source_64 = __asyncValues(source); source_64_1 = yield source_64.next(), !source_64_1.done;) {
                    const item = yield source_64_1.value;
                    min = Math.min(min || Number.POSITIVE_INFINITY, yield selector(item));
                }
            }
            catch (e_74_1) { e_74 = { error: e_74_1 }; }
            finally {
                try {
                    if (source_64_1 && !source_64_1.done && (_a = source_64.return)) yield _a.call(source_64);
                }
                finally { if (e_74) throw e_74.error; }
            }
            if (min === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return min;
            }
        });
    }
    /**
     * Generates a sequence of integral numbers within a specified range.
     * @param start The value of the first integer in the sequence.
     * @param count The number of sequential integers to generate.
     * @throws {ArgumentOutOfRangeException} Start is Less than 0
     */
    static range(start, count) {
        if (start < 0) {
            throw new shared_1.ArgumentOutOfRangeException(`start`);
        }
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_27() {
                const max = start + count;
                for (let i = start; i < max; i++) {
                    yield yield __await(i);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static repeat(element, count, delay) {
        if (count < 0) {
            throw new shared_1.ArgumentOutOfRangeException(`count`);
        }
        if (delay) {
            return AsyncEnumerable.repeat_2(element, count, delay);
        }
        else {
            return AsyncEnumerable.repeat_1(element, count);
        }
    }
    static repeat_1(element, count) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_28() {
                for (let i = 0; i < count; i++) {
                    yield yield __await(element);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static repeat_2(element, count, delay) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_29() {
                for (let i = 0; i < count; i++) {
                    yield yield __await(yield __await(new Promise((resolve) => setTimeout(() => resolve(element), delay))));
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static reverse(source) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_30() {
                var e_75, _a;
                const values = [];
                try {
                    for (var source_65 = __asyncValues(source), source_65_1; source_65_1 = yield __await(source_65.next()), !source_65_1.done;) {
                        const value = yield yield __await(__await(source_65_1.value));
                        values.push(value);
                    }
                }
                catch (e_75_1) { e_75 = { error: e_75_1 }; }
                finally {
                    try {
                        if (source_65_1 && !source_65_1.done && (_a = source_65.return)) yield __await(_a.call(source_65));
                    }
                    finally { if (e_75) throw e_75.error; }
                }
                for (let i = values.length - 1; i >= 0; i--) {
                    yield yield __await(values[i]);
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static sequenceEquals(first, second, comparer = shared_1.StrictEqualityComparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstIterator = first[Symbol.asyncIterator]();
            const secondIterator = second[Symbol.asyncIterator]();
            let results = yield Promise.all([firstIterator.next(), secondIterator.next()]);
            let firstResult = results[0];
            let secondResult = results[1];
            while (!firstResult.done && !secondResult.done) {
                if (!comparer(firstResult.value, secondResult.value)) {
                    return false;
                }
                results = yield Promise.all([firstIterator.next(), secondIterator.next()]);
                firstResult = results[0];
                secondResult = results[1];
            }
            return firstResult.done && secondResult.done;
        });
    }
    static sequenceEqualsAsync(first, second, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstIterator = first[Symbol.asyncIterator]();
            const secondIterator = second[Symbol.asyncIterator]();
            let results = yield Promise.all([firstIterator.next(), secondIterator.next()]);
            let firstResult = results[0];
            let secondResult = results[1];
            while (!firstResult.done && !secondResult.done) {
                if ((yield comparer(firstResult.value, secondResult.value)) === false) {
                    return false;
                }
                results = yield Promise.all([firstIterator.next(), secondIterator.next()]);
                firstResult = results[0];
                secondResult = results[1];
            }
            return firstResult.done && secondResult.done;
        });
    }
    static sum(source, selector) {
        if (selector) {
            return AsyncEnumerable.sum_2(source, selector);
        }
        else {
            return AsyncEnumerable.sum_1(source);
        }
    }
    static sum_1(source) {
        var source_66, source_66_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_76, _a;
            let sum = 0;
            try {
                for (source_66 = __asyncValues(source); source_66_1 = yield source_66.next(), !source_66_1.done;) {
                    const value = yield source_66_1.value;
                    sum += value;
                }
            }
            catch (e_76_1) { e_76 = { error: e_76_1 }; }
            finally {
                try {
                    if (source_66_1 && !source_66_1.done && (_a = source_66.return)) yield _a.call(source_66);
                }
                finally { if (e_76) throw e_76.error; }
            }
            return sum;
        });
    }
    static sum_2(source, selector) {
        var source_67, source_67_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_77, _a;
            let sum = 0;
            try {
                for (source_67 = __asyncValues(source); source_67_1 = yield source_67.next(), !source_67_1.done;) {
                    const value = yield source_67_1.value;
                    sum += selector(value);
                }
            }
            catch (e_77_1) { e_77 = { error: e_77_1 }; }
            finally {
                try {
                    if (source_67_1 && !source_67_1.done && (_a = source_67.return)) yield _a.call(source_67);
                }
                finally { if (e_77) throw e_77.error; }
            }
            return sum;
        });
    }
    static sumAsync(source, selector) {
        var source_68, source_68_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_78, _a;
            let sum = 0;
            try {
                for (source_68 = __asyncValues(source); source_68_1 = yield source_68.next(), !source_68_1.done;) {
                    const value = yield source_68_1.value;
                    sum += yield selector(value);
                }
            }
            catch (e_78_1) { e_78 = { error: e_78_1 }; }
            finally {
                try {
                    if (source_68_1 && !source_68_1.done && (_a = source_68.return)) yield _a.call(source_68);
                }
                finally { if (e_78) throw e_78.error; }
            }
            return sum;
        });
    }
    static take(source, amount) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_31() {
                var e_79, _a;
                // negative amounts should yield empty
                let amountLeft = amount > 0 ? amount : 0;
                try {
                    for (var source_69 = __asyncValues(source), source_69_1; source_69_1 = yield __await(source_69.next()), !source_69_1.done;) {
                        const item = yield yield __await(__await(source_69_1.value));
                        if (amountLeft-- === 0) {
                            break;
                        }
                        else {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_79_1) { e_79 = { error: e_79_1 }; }
                finally {
                    try {
                        if (source_69_1 && !source_69_1.done && (_a = source_69.return)) yield __await(_a.call(source_69));
                    }
                    finally { if (e_79) throw e_79.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static takeWhile(source, predicate) {
        if (predicate.length === 1) {
            return AsyncEnumerable.takeWhile_1(source, predicate);
        }
        else {
            return AsyncEnumerable.takeWhile_2(source, predicate);
        }
    }
    static takeWhile_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_32() {
                var e_80, _a;
                try {
                    for (var source_70 = __asyncValues(source), source_70_1; source_70_1 = yield __await(source_70.next()), !source_70_1.done;) {
                        const item = yield yield __await(__await(source_70_1.value));
                        if (predicate(item)) {
                            yield yield __await(item);
                        }
                        else {
                            break;
                        }
                    }
                }
                catch (e_80_1) { e_80 = { error: e_80_1 }; }
                finally {
                    try {
                        if (source_70_1 && !source_70_1.done && (_a = source_70.return)) yield __await(_a.call(source_70));
                    }
                    finally { if (e_80) throw e_80.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static takeWhile_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_33() {
                var e_81, _a;
                let index = 0;
                try {
                    for (var source_71 = __asyncValues(source), source_71_1; source_71_1 = yield __await(source_71.next()), !source_71_1.done;) {
                        const item = yield yield __await(__await(source_71_1.value));
                        if (predicate(item, index++)) {
                            yield yield __await(item);
                        }
                        else {
                            break;
                        }
                    }
                }
                catch (e_81_1) { e_81 = { error: e_81_1 }; }
                finally {
                    try {
                        if (source_71_1 && !source_71_1.done && (_a = source_71.return)) yield __await(_a.call(source_71));
                    }
                    finally { if (e_81) throw e_81.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static takeWhileAsync(source, predicate) {
        if (predicate.length === 1) {
            return AsyncEnumerable.takeWhileAsync_1(source, predicate);
        }
        else {
            return AsyncEnumerable.takeWhileAsync_2(source, predicate);
        }
    }
    static takeWhileAsync_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_34() {
                var e_82, _a;
                try {
                    for (var source_72 = __asyncValues(source), source_72_1; source_72_1 = yield __await(source_72.next()), !source_72_1.done;) {
                        const item = yield yield __await(__await(source_72_1.value));
                        if (yield __await(predicate(item))) {
                            yield yield __await(item);
                        }
                        else {
                            break;
                        }
                    }
                }
                catch (e_82_1) { e_82 = { error: e_82_1 }; }
                finally {
                    try {
                        if (source_72_1 && !source_72_1.done && (_a = source_72.return)) yield __await(_a.call(source_72));
                    }
                    finally { if (e_82) throw e_82.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static takeWhileAsync_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_35() {
                var e_83, _a;
                let index = 0;
                try {
                    for (var source_73 = __asyncValues(source), source_73_1; source_73_1 = yield __await(source_73.next()), !source_73_1.done;) {
                        const item = yield yield __await(__await(source_73_1.value));
                        if (yield __await(predicate(item, index++))) {
                            yield yield __await(item);
                        }
                        else {
                            break;
                        }
                    }
                }
                catch (e_83_1) { e_83 = { error: e_83_1 }; }
                finally {
                    try {
                        if (source_73_1 && !source_73_1.done && (_a = source_73.return)) yield __await(_a.call(source_73));
                    }
                    finally { if (e_83) throw e_83.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static toArray(source) {
        var source_74, source_74_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_84, _a;
            const array = [];
            try {
                for (source_74 = __asyncValues(source); source_74_1 = yield source_74.next(), !source_74_1.done;) {
                    const item = yield source_74_1.value;
                    array.push(item);
                }
            }
            catch (e_84_1) { e_84 = { error: e_84_1 }; }
            finally {
                try {
                    if (source_74_1 && !source_74_1.done && (_a = source_74.return)) yield _a.call(source_74);
                }
                finally { if (e_84) throw e_84.error; }
            }
            return array;
        });
    }
    static toMap(source, selector) {
        var source_75, source_75_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_85, _a;
            const map = new Map();
            try {
                for (source_75 = __asyncValues(source); source_75_1 = yield source_75.next(), !source_75_1.done;) {
                    const value = yield source_75_1.value;
                    const key = selector(value);
                    const array = map.get(key);
                    if (array === undefined) {
                        map.set(key, [value]);
                    }
                    else {
                        array.push(value);
                    }
                }
            }
            catch (e_85_1) { e_85 = { error: e_85_1 }; }
            finally {
                try {
                    if (source_75_1 && !source_75_1.done && (_a = source_75.return)) yield _a.call(source_75);
                }
                finally { if (e_85) throw e_85.error; }
            }
            return map;
        });
    }
    static toMapAsync(source, selector) {
        var source_76, source_76_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_86, _a;
            const map = new Map();
            try {
                for (source_76 = __asyncValues(source); source_76_1 = yield source_76.next(), !source_76_1.done;) {
                    const value = yield source_76_1.value;
                    const key = yield selector(value);
                    const array = map.get(key);
                    if (array === undefined) {
                        map.set(key, [value]);
                    }
                    else {
                        array.push(value);
                    }
                }
            }
            catch (e_86_1) { e_86 = { error: e_86_1 }; }
            finally {
                try {
                    if (source_76_1 && !source_76_1.done && (_a = source_76.return)) yield _a.call(source_76);
                }
                finally { if (e_86) throw e_86.error; }
            }
            return map;
        });
    }
    static toObject(source, selector) {
        var source_77, source_77_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_87, _a;
            const map = {};
            try {
                for (source_77 = __asyncValues(source); source_77_1 = yield source_77.next(), !source_77_1.done;) {
                    const value = yield source_77_1.value;
                    map[selector(value)] = value;
                }
            }
            catch (e_87_1) { e_87 = { error: e_87_1 }; }
            finally {
                try {
                    if (source_77_1 && !source_77_1.done && (_a = source_77.return)) yield _a.call(source_77);
                }
                finally { if (e_87) throw e_87.error; }
            }
            return map;
        });
    }
    static toObjectAsync(source, selector) {
        var source_78, source_78_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_88, _a;
            const map = {};
            try {
                for (source_78 = __asyncValues(source); source_78_1 = yield source_78.next(), !source_78_1.done;) {
                    const value = yield source_78_1.value;
                    map[yield selector(value)] = value;
                }
            }
            catch (e_88_1) { e_88 = { error: e_88_1 }; }
            finally {
                try {
                    if (source_78_1 && !source_78_1.done && (_a = source_78.return)) yield _a.call(source_78);
                }
                finally { if (e_88) throw e_88.error; }
            }
            return map;
        });
    }
    static toSet(source) {
        var source_79, source_79_1;
        return __awaiter(this, void 0, void 0, function* () {
            var e_89, _a;
            const set = new Set();
            try {
                for (source_79 = __asyncValues(source); source_79_1 = yield source_79.next(), !source_79_1.done;) {
                    const item = yield source_79_1.value;
                    set.add(item);
                }
            }
            catch (e_89_1) { e_89 = { error: e_89_1 }; }
            finally {
                try {
                    if (source_79_1 && !source_79_1.done && (_a = source_79.return)) yield _a.call(source_79);
                }
                finally { if (e_89) throw e_89.error; }
            }
            return set;
        });
    }
    static union(first, second, comparer) {
        if (comparer) {
            return AsyncEnumerable.union_2(first, second, comparer);
        }
        else {
            return AsyncEnumerable.union_1(first, second);
        }
    }
    static union_1(first, second) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_36() {
                var e_90, _a, e_91, _b;
                const set = new Set();
                try {
                    for (var first_5 = __asyncValues(first), first_5_1; first_5_1 = yield __await(first_5.next()), !first_5_1.done;) {
                        const item = yield yield __await(__await(first_5_1.value));
                        if (set.has(item) === false) {
                            yield yield __await(item);
                            set.add(item);
                        }
                    }
                }
                catch (e_90_1) { e_90 = { error: e_90_1 }; }
                finally {
                    try {
                        if (first_5_1 && !first_5_1.done && (_a = first_5.return)) yield __await(_a.call(first_5));
                    }
                    finally { if (e_90) throw e_90.error; }
                }
                try {
                    for (var second_3 = __asyncValues(second), second_3_1; second_3_1 = yield __await(second_3.next()), !second_3_1.done;) {
                        const item = yield yield __await(__await(second_3_1.value));
                        if (set.has(item) === false) {
                            yield yield __await(item);
                            set.add(item);
                        }
                    }
                }
                catch (e_91_1) { e_91 = { error: e_91_1 }; }
                finally {
                    try {
                        if (second_3_1 && !second_3_1.done && (_b = second_3.return)) yield __await(_b.call(second_3));
                    }
                    finally { if (e_91) throw e_91.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static union_2(first, second, comparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_37() {
                var e_92, _a;
                const result = [];
                for (const source of [first, second]) {
                    try {
                        for (var source_80 = __asyncValues(source), source_80_1; source_80_1 = yield __await(source_80.next()), !source_80_1.done;) {
                            const value = yield yield __await(__await(source_80_1.value));
                            let exists = false;
                            for (const resultValue of result) {
                                if (comparer(value, resultValue) === true) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (exists === false) {
                                yield yield __await(value);
                                result.push(value);
                            }
                        }
                    }
                    catch (e_92_1) { e_92 = { error: e_92_1 }; }
                    finally {
                        try {
                            if (source_80_1 && !source_80_1.done && (_a = source_80.return)) yield __await(_a.call(source_80));
                        }
                        finally { if (e_92) throw e_92.error; }
                    }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static unionAsync(first, second, comparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_38() {
                var e_93, _a;
                const result = [];
                for (const source of [first, second]) {
                    try {
                        for (var source_81 = __asyncValues(source), source_81_1; source_81_1 = yield __await(source_81.next()), !source_81_1.done;) {
                            const value = yield yield __await(__await(source_81_1.value));
                            let exists = false;
                            for (const resultValue of result) {
                                if ((yield __await(comparer(value, resultValue))) === true) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (exists === false) {
                                yield yield __await(value);
                                result.push(value);
                            }
                        }
                    }
                    catch (e_93_1) { e_93 = { error: e_93_1 }; }
                    finally {
                        try {
                            if (source_81_1 && !source_81_1.done && (_a = source_81.return)) yield __await(_a.call(source_81));
                        }
                        finally { if (e_93) throw e_93.error; }
                    }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static where(source, predicate) {
        if (predicate.length === 1) {
            return AsyncEnumerable.where_1(source, predicate);
        }
        else {
            return AsyncEnumerable.where_2(source, predicate);
        }
    }
    static where_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_39() {
                var e_94, _a;
                try {
                    for (var source_82 = __asyncValues(source), source_82_1; source_82_1 = yield __await(source_82.next()), !source_82_1.done;) {
                        const item = yield yield __await(__await(source_82_1.value));
                        if (predicate(item) === true) {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_94_1) { e_94 = { error: e_94_1 }; }
                finally {
                    try {
                        if (source_82_1 && !source_82_1.done && (_a = source_82.return)) yield __await(_a.call(source_82));
                    }
                    finally { if (e_94) throw e_94.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static where_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_40() {
                var e_95, _a;
                let i = 0;
                try {
                    for (var source_83 = __asyncValues(source), source_83_1; source_83_1 = yield __await(source_83.next()), !source_83_1.done;) {
                        const item = yield yield __await(__await(source_83_1.value));
                        if (predicate(item, i++) === true) {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_95_1) { e_95 = { error: e_95_1 }; }
                finally {
                    try {
                        if (source_83_1 && !source_83_1.done && (_a = source_83.return)) yield __await(_a.call(source_83));
                    }
                    finally { if (e_95) throw e_95.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static whereAsync(source, predicate) {
        if (predicate.length === 1) {
            return AsyncEnumerable.whereAsync_1(source, predicate);
        }
        else {
            return AsyncEnumerable.whereAsync_2(source, predicate);
        }
    }
    static whereAsync_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_41() {
                var e_96, _a;
                try {
                    for (var source_84 = __asyncValues(source), source_84_1; source_84_1 = yield __await(source_84.next()), !source_84_1.done;) {
                        const item = yield yield __await(__await(source_84_1.value));
                        if ((yield __await(predicate(item))) === true) {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_96_1) { e_96 = { error: e_96_1 }; }
                finally {
                    try {
                        if (source_84_1 && !source_84_1.done && (_a = source_84.return)) yield __await(_a.call(source_84));
                    }
                    finally { if (e_96) throw e_96.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static whereAsync_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_42() {
                var e_97, _a;
                let i = 0;
                try {
                    for (var source_85 = __asyncValues(source), source_85_1; source_85_1 = yield __await(source_85.next()), !source_85_1.done;) {
                        const item = yield yield __await(__await(source_85_1.value));
                        if ((yield __await(predicate(item, i++))) === true) {
                            yield yield __await(item);
                        }
                    }
                }
                catch (e_97_1) { e_97 = { error: e_97_1 }; }
                finally {
                    try {
                        if (source_85_1 && !source_85_1.done && (_a = source_85.return)) yield __await(_a.call(source_85));
                    }
                    finally { if (e_97) throw e_97.error; }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static zip(source, second, resultSelector) {
        if (resultSelector) {
            return AsyncEnumerable.zip_2(source, second, resultSelector);
        }
        else {
            return AsyncEnumerable.zip_1(source, second);
        }
    }
    static zip_1(source, second) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_43() {
                const firstIterator = source[Symbol.asyncIterator]();
                const secondIterator = second[Symbol.asyncIterator]();
                while (true) {
                    const result = yield __await(Promise.all([firstIterator.next(), secondIterator.next()]));
                    const a = result[0];
                    const b = result[1];
                    if (a.done && b.done) {
                        break;
                    }
                    else {
                        yield yield __await(shared_1.AsTuple(a.value, b.value));
                    }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static zip_2(source, second, resultSelector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_44() {
                const firstIterator = source[Symbol.asyncIterator]();
                const secondIterator = second[Symbol.asyncIterator]();
                while (true) {
                    const result = yield __await(Promise.all([firstIterator.next(), secondIterator.next()]));
                    const a = result[0];
                    const b = result[1];
                    if (a.done && b.done) {
                        break;
                    }
                    else {
                        yield yield __await(resultSelector(a.value, b.value));
                    }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
    }
    static zipAsync(source, second, resultSelector) {
        function generator() {
            return __asyncGenerator(this, arguments, function* generator_1() {
                const firstIterator = source[Symbol.asyncIterator]();
                const secondIterator = second[Symbol.asyncIterator]();
                while (true) {
                    const results = yield __await(Promise.all([firstIterator.next(), secondIterator.next()]));
                    const firstNext = results[0];
                    const secondNext = results[1];
                    if (firstNext.done || secondNext.done) {
                        break;
                    }
                    else {
                        yield yield __await(resultSelector(firstNext.value, secondNext.value));
                    }
                }
            });
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(generator);
    }
    constructor() { }
}
exports.AsyncEnumerable = AsyncEnumerable;
Object.freeze(AsyncEnumerable);
