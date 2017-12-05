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
var __asyncValues = (this && this.__asyncIterator) || function (o) {
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
require("core-js/modules/es7.symbol.async-iterator");
const shared_1 = require("../shared/shared");
const sync_1 = require("../sync/sync");
class BasicAsyncEnumerable {
    constructor(iterator) {
        this.iterator = iterator;
    }
    aggregate(seedOrFunc, func, resultSelector) {
        return AsyncEnumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return AsyncEnumerable.all(this, predicate);
    }
    any(predicate) {
        return AsyncEnumerable.any(this, predicate);
    }
    average(selector) {
        return AsyncEnumerable.average(this, selector);
    }
    concat(second) {
        return AsyncEnumerable.concat(this, second);
    }
    contains(value, comparer) {
        return AsyncEnumerable.contains(this, value, comparer);
    }
    count(predicate) {
        return AsyncEnumerable.count(this, predicate);
    }
    distinct(comparer) {
        return AsyncEnumerable.distinct(this, comparer);
    }
    elementAt(index) {
        return AsyncEnumerable.elementAt(this, index);
    }
    elementAtOrDefault(index) {
        return AsyncEnumerable.elementAtOrDefault(this, index);
    }
    each(action) {
        return AsyncEnumerable.each(this, action);
    }
    except(second, comparer) {
        return AsyncEnumerable.except(this, second, comparer);
    }
    first(predicate) {
        return AsyncEnumerable.first(this, predicate);
    }
    firstOrDefault(predicate) {
        return AsyncEnumerable.firstOrDefault(this, predicate);
    }
    groupBy(keySelector, comparer) {
        return AsyncEnumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return AsyncEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return AsyncEnumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return AsyncEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return AsyncEnumerable.last(this, predicate);
    }
    lastOrDefault(predicate) {
        return AsyncEnumerable.lastOrDefault(this, predicate);
    }
    max(selector) {
        return AsyncEnumerable.max(this, selector);
    }
    min(selector) {
        return AsyncEnumerable.min(this, selector);
    }
    ofType(type) {
        return AsyncEnumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return AsyncEnumerable.orderBy(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return AsyncEnumerable.orderByDescending(this, predicate, comparer);
    }
    reverse() {
        return AsyncEnumerable.reverse(this);
    }
    select(selector) {
        return AsyncEnumerable.select(this, selector);
    }
    selectMany(selector) {
        return AsyncEnumerable.selectMany(this, selector);
    }
    sequenceEquals(second, comparer) {
        return AsyncEnumerable.sequenceEquals(this, second, comparer);
    }
    single(predicate) {
        return AsyncEnumerable.single(this, predicate);
    }
    singleOrDefault(predicate) {
        return AsyncEnumerable.singleOrDefault(this, predicate);
    }
    skip(count) {
        return AsyncEnumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return AsyncEnumerable.skipWhile(this, predicate);
    }
    sum(selector) {
        return AsyncEnumerable.sum(this, selector);
    }
    take(amount) {
        return AsyncEnumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return AsyncEnumerable.takeWhile(this, predicate);
    }
    toArray() {
        return AsyncEnumerable.toArray(this);
    }
    toMap(selector) {
        return AsyncEnumerable.toMap(this, selector);
    }
    toSet() {
        return AsyncEnumerable.toSet(this);
    }
    union(second, comparer) {
        return AsyncEnumerable.union(this, second, comparer);
    }
    where(predicate) {
        return AsyncEnumerable.where(this, predicate);
    }
    zip(second, resultSelector) {
        return AsyncEnumerable.zip(this, second, resultSelector);
    }
    [Symbol.asyncIterator]() {
        return this.iterator();
    }
}
exports.BasicAsyncEnumerable = BasicAsyncEnumerable;
class OrderedAsyncEnumerable extends BasicAsyncEnumerable {
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
        return AsyncEnumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return AsyncEnumerable.thenByDescending(this, keySelector, comparer);
    }
}
class OrderedAsyncEnumerableDescending extends BasicAsyncEnumerable {
    constructor(map, comparer) {
        super(OrderedAsyncEnumerableDescending.generate(map, comparer));
        this.map = map;
    }
    static unrollAndSort(mapPromise, comparer) {
        return __asyncGenerator(this, arguments, function* unrollAndSort_2() {
            const map = yield __await(mapPromise);
            const sortedKeys = [...map.keys()].sort(comparer ? comparer : undefined);
            for (let i = sortedKeys.length - 1; i >= 0; i--) {
                const key = sortedKeys[i];
                const values = map.get(key);
                if (values instanceof Map) {
                    yield __await(yield* __asyncDelegator(__asyncValues(OrderedAsyncEnumerableDescending.unrollAndSort(values, comparer))));
                }
                else {
                    for (const value of values) {
                        yield value;
                    }
                }
            }
        });
    }
    static generate(mapFunc, comparer) {
        return () => OrderedAsyncEnumerableDescending.unrollAndSort(mapFunc(), comparer);
    }
    getMap() {
        return this.map();
    }
    thenBy(keySelector, comparer) {
        return AsyncEnumerable.thenBy(this, keySelector, comparer);
    }
    thenByDescending(keySelector, comparer) {
        return AsyncEnumerable.thenByDescending(this, keySelector, comparer);
    }
}
class AsyncGrouping extends Array {
    constructor(key, startingItem) {
        super(1);
        this.key = key;
        this.currentIndex = 0;
        this[0] = startingItem;
    }
    next() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const value = yield this[this.currentIndex++];
            resolve({
                done: this.currentIndex === this.length,
                value,
            });
        }));
    }
    [Symbol.asyncIterator]() {
        return this;
    }
}
exports.AsyncGrouping = AsyncGrouping;
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
        return __awaiter(this, void 0, void 0, function* () {
            let aggregateValue;
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield source_1.next(), !source_1_1.done;) {
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
            var e_1, _a;
        });
    }
    static aggregate_2(source, seed, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregateValue = seed;
            try {
                for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield source_2.next(), !source_2_1.done;) {
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
            var e_2, _a;
        });
    }
    static aggregate_3(source, seed, func, resultSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregateValue = seed;
            try {
                for (var source_3 = __asyncValues(source), source_3_1; source_3_1 = yield source_3.next(), !source_3_1.done;) {
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
            var e_3, _a;
        });
    }
    static all(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var source_4 = __asyncValues(source), source_4_1; source_4_1 = yield source_4.next(), !source_4_1.done;) {
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
            var e_4, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var source_5 = __asyncValues(source), source_5_1; source_5_1 = yield source_5.next(), !source_5_1.done;) {
                    const _ = yield source_5_1.value;
                    return true;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (source_5_1 && !source_5_1.done && (_a = source_5.return)) yield _a.call(source_5);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return false;
            var e_5, _a;
        });
    }
    static any_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var source_6 = __asyncValues(source), source_6_1; source_6_1 = yield source_6.next(), !source_6_1.done;) {
                    const item = yield source_6_1.value;
                    if (predicate(item) === true) {
                        return true;
                    }
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
            var e_6, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            let value;
            let count;
            try {
                for (var source_7 = __asyncValues(source), source_7_1; source_7_1 = yield source_7.next(), !source_7_1.done;) {
                    const item = yield source_7_1.value;
                    value = (value || 0) + item;
                    count = (count || 0) + 1;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (source_7_1 && !source_7_1.done && (_a = source_7.return)) yield _a.call(source_7);
                }
                finally { if (e_7) throw e_7.error; }
            }
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return value / count;
            var e_7, _a;
        });
    }
    static average_2(source, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let value;
            let count;
            try {
                for (var source_8 = __asyncValues(source), source_8_1; source_8_1 = yield source_8.next(), !source_8_1.done;) {
                    const item = yield source_8_1.value;
                    value = (value || 0) + func(item);
                    count = (count || 0) + 1;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield _a.call(source_8);
                }
                finally { if (e_8) throw e_8.error; }
            }
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return value / count;
            var e_8, _a;
        });
    }
    static concat(first, second) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_1() {
                yield __await(yield* __asyncDelegator(__asyncValues(first)));
                yield __await(yield* __asyncDelegator(__asyncValues(second)));
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static contains(source, value, comparer = shared_1.StrictEqualityComparer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var source_9 = __asyncValues(source), source_9_1; source_9_1 = yield source_9.next(), !source_9_1.done;) {
                    const item = yield source_9_1.value;
                    if (comparer(value, item)) {
                        return true;
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield _a.call(source_9);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return false;
            var e_9, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            try {
                for (var source_10 = __asyncValues(source), source_10_1; source_10_1 = yield source_10.next(), !source_10_1.done;) {
                    const _ = yield source_10_1.value;
                    count++;
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield _a.call(source_10);
                }
                finally { if (e_10) throw e_10.error; }
            }
            return count;
            var e_10, _a;
        });
    }
    static count_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            try {
                for (var source_11 = __asyncValues(source), source_11_1; source_11_1 = yield source_11.next(), !source_11_1.done;) {
                    const value = yield source_11_1.value;
                    if (predicate(value) === true) {
                        count++;
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (source_11_1 && !source_11_1.done && (_a = source_11.return)) yield _a.call(source_11);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return count;
            var e_11, _a;
        });
    }
    static distinct(source, comparer = shared_1.StrictEqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_2() {
                const distinctElements = [];
                try {
                    for (var source_12 = __asyncValues(source), source_12_1; source_12_1 = yield __await(source_12.next()), !source_12_1.done;) {
                        const item = yield __await(source_12_1.value);
                        const foundItem = distinctElements.find((x) => comparer(x, item));
                        if (!foundItem) {
                            distinctElements.push(item);
                            yield item;
                        }
                    }
                }
                catch (e_12_1) { e_12 = { error: e_12_1 }; }
                finally {
                    try {
                        if (source_12_1 && !source_12_1.done && (_a = source_12.return)) yield __await(_a.call(source_12));
                    }
                    finally { if (e_12) throw e_12.error; }
                }
                var e_12, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static elementAt(source, index) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            try {
                for (var source_13 = __asyncValues(source), source_13_1; source_13_1 = yield source_13.next(), !source_13_1.done;) {
                    const item = yield source_13_1.value;
                    if (index === i++) {
                        return item;
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
            throw new shared_1.ArgumentOutOfRangeException("index");
            var e_13, _a;
        });
    }
    static elementAtOrDefault(source, index) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            try {
                for (var source_14 = __asyncValues(source), source_14_1; source_14_1 = yield source_14.next(), !source_14_1.done;) {
                    const item = yield source_14_1.value;
                    if (index === i++) {
                        return item;
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
            return null;
            var e_14, _a;
        });
    }
    static enumerateObject(source) {
        function iterable() {
            return __asyncGenerator(this, arguments, function* iterable_1() {
                for (const key in source) {
                    yield {
                        first: key,
                        second: source[key]
                    };
                }
            });
        }
        return new BasicAsyncEnumerable(iterable);
    }
    static except(first, second, comparer = shared_1.EqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_3() {
                const secondArray = [];
                try {
                    for (var second_1 = __asyncValues(second), second_1_1; second_1_1 = yield __await(second_1.next()), !second_1_1.done;) {
                        const x = yield __await(second_1_1.value);
                        secondArray.push(x);
                    }
                }
                catch (e_15_1) { e_15 = { error: e_15_1 }; }
                finally {
                    try {
                        if (second_1_1 && !second_1_1.done && (_a = second_1.return)) yield __await(_a.call(second_1));
                    }
                    finally { if (e_15) throw e_15.error; }
                }
                try {
                    for (var first_3 = __asyncValues(first), first_3_1; first_3_1 = yield __await(first_3.next()), !first_3_1.done;) {
                        const firstItem = yield __await(first_3_1.value);
                        let exists = false;
                        for (let j = 0; j < secondArray.length; j++) {
                            const secondItem = secondArray[j];
                            if (comparer(firstItem, secondItem) === true) {
                                exists = true;
                                break;
                            }
                        }
                        if (exists === false) {
                            yield firstItem;
                        }
                    }
                }
                catch (e_16_1) { e_16 = { error: e_16_1 }; }
                finally {
                    try {
                        if (first_3_1 && !first_3_1.done && (_b = first_3.return)) yield __await(_b.call(first_3));
                    }
                    finally { if (e_16) throw e_16.error; }
                }
                var e_15, _a, e_16, _b;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var source_15 = __asyncValues(source), source_15_1; source_15_1 = yield source_15.next(), !source_15_1.done;) {
                    const value = yield source_15_1.value;
                    if (predicate(value) === true) {
                        return value;
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (source_15_1 && !source_15_1.done && (_a = source_15.return)) yield _a.call(source_15);
                }
                finally { if (e_17) throw e_17.error; }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            var e_17, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (var source_16 = __asyncValues(source), source_16_1; source_16_1 = yield source_16.next(), !source_16_1.done;) {
                    const value = yield source_16_1.value;
                    if (predicate(value) === true) {
                        return value;
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (source_16_1 && !source_16_1.done && (_a = source_16.return)) yield _a.call(source_16);
                }
                finally { if (e_18) throw e_18.error; }
            }
            return null;
            var e_18, _a;
        });
    }
    static flatten(source, shallow) {
        function iterator(sourceInner) {
            return __asyncGenerator(this, arguments, function* iterator_4() {
                try {
                    for (var sourceInner_1 = __asyncValues(sourceInner), sourceInner_1_1; sourceInner_1_1 = yield __await(sourceInner_1.next()), !sourceInner_1_1.done;) {
                        const item = yield __await(sourceInner_1_1.value);
                        if (item[Symbol.asyncIterator] !== undefined) {
                            const items = shallow ? item : iterator(item);
                            try {
                                for (var items_1 = __asyncValues(items), items_1_1; items_1_1 = yield __await(items_1.next()), !items_1_1.done;) {
                                    const inner = yield __await(items_1_1.value);
                                    yield inner;
                                }
                            }
                            catch (e_19_1) { e_19 = { error: e_19_1 }; }
                            finally {
                                try {
                                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) yield __await(_a.call(items_1));
                                }
                                finally { if (e_19) throw e_19.error; }
                            }
                        }
                        else {
                            yield item;
                        }
                    }
                }
                catch (e_20_1) { e_20 = { error: e_20_1 }; }
                finally {
                    try {
                        if (sourceInner_1_1 && !sourceInner_1_1.done && (_b = sourceInner_1.return)) yield __await(_b.call(sourceInner_1));
                    }
                    finally { if (e_20) throw e_20.error; }
                }
                var e_20, _b, e_19, _a;
            });
        }
        return new BasicAsyncEnumerable(() => iterator(source));
    }
    static from(promisesOrIterable) {
        if (Array.isArray(promisesOrIterable)) {
            if (promisesOrIterable.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return new BasicAsyncEnumerable(function () {
                return __asyncGenerator(this, arguments, function* () {
                    try {
                        for (var promisesOrIterable_1 = __asyncValues(promisesOrIterable), promisesOrIterable_1_1; promisesOrIterable_1_1 = yield __await(promisesOrIterable_1.next()), !promisesOrIterable_1_1.done;) {
                            const value = yield __await(promisesOrIterable_1_1.value);
                            yield value;
                        }
                    }
                    catch (e_21_1) { e_21 = { error: e_21_1 }; }
                    finally {
                        try {
                            if (promisesOrIterable_1_1 && !promisesOrIterable_1_1.done && (_a = promisesOrIterable_1.return)) yield __await(_a.call(promisesOrIterable_1));
                        }
                        finally { if (e_21) throw e_21.error; }
                    }
                    var e_21, _a;
                });
            });
        }
        else {
            return new BasicAsyncEnumerable(promisesOrIterable);
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
                yield yield __await(promise);
            });
        }
        return new BasicAsyncEnumerable(eventGenerator);
    }
    static each(source, action) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_5() {
                try {
                    for (var source_17 = __asyncValues(source), source_17_1; source_17_1 = yield __await(source_17.next()), !source_17_1.done;) {
                        const value = yield __await(source_17_1.value);
                        action(value);
                        yield value;
                    }
                }
                catch (e_22_1) { e_22 = { error: e_22_1 }; }
                finally {
                    try {
                        if (source_17_1 && !source_17_1.done && (_a = source_17.return)) yield __await(_a.call(source_17));
                    }
                    finally { if (e_22) throw e_22.error; }
                }
                var e_22, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
            return __asyncGenerator(this, arguments, function* iterator_6() {
                const keyMap = {};
                try {
                    for (var source_18 = __asyncValues(source), source_18_1; source_18_1 = yield __await(source_18.next()), !source_18_1.done;) {
                        const value = yield __await(source_18_1.value);
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
                catch (e_23_1) { e_23 = { error: e_23_1 }; }
                finally {
                    try {
                        if (source_18_1 && !source_18_1.done && (_a = source_18.return)) yield __await(_a.call(source_18));
                    }
                    finally { if (e_23) throw e_23.error; }
                }
                for (const value in keyMap) {
                    yield keyMap[value];
                }
                var e_23, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static groupBy_0(source, keySelector, comparer) {
        function generate() {
            return __asyncGenerator(this, arguments, function* generate_1() {
                const keyMap = new Array();
                try {
                    for (var source_19 = __asyncValues(source), source_19_1; source_19_1 = yield __await(source_19.next()), !source_19_1.done;) {
                        const value = yield __await(source_19_1.value);
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
                catch (e_24_1) { e_24 = { error: e_24_1 }; }
                finally {
                    try {
                        if (source_19_1 && !source_19_1.done && (_a = source_19.return)) yield __await(_a.call(source_19));
                    }
                    finally { if (e_24) throw e_24.error; }
                }
                for (const g of keyMap) {
                    yield g;
                }
                var e_24, _a;
            });
        }
        return new BasicAsyncEnumerable(generate);
    }
    static groupByWithSel(source, keySelector, elementSelector, comparer) {
        if (comparer) {
            return AsyncEnumerable.GroupBy_1(source, keySelector, elementSelector, comparer);
        }
        else {
            return AsyncEnumerable.GroupBy_1_Simple(source, keySelector, elementSelector);
        }
    }
    static GroupBy_1_Simple(source, keySelector, elementSelector) {
        function generate() {
            return __asyncGenerator(this, arguments, function* generate_2() {
                const keyMap = {};
                try {
                    for (var source_20 = __asyncValues(source), source_20_1; source_20_1 = yield __await(source_20.next()), !source_20_1.done;) {
                        const value = yield __await(source_20_1.value);
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
                catch (e_25_1) { e_25 = { error: e_25_1 }; }
                finally {
                    try {
                        if (source_20_1 && !source_20_1.done && (_a = source_20.return)) yield __await(_a.call(source_20));
                    }
                    finally { if (e_25) throw e_25.error; }
                }
                for (const value in keyMap) {
                    yield keyMap[value];
                }
                var e_25, _a;
            });
        }
        return new BasicAsyncEnumerable(generate);
    }
    static GroupBy_1(source, keySelector, elementSelector, comparer) {
        function generate() {
            return __asyncGenerator(this, arguments, function* generate_3() {
                const keyMap = new Array();
                try {
                    for (var source_21 = __asyncValues(source), source_21_1; source_21_1 = yield __await(source_21.next()), !source_21_1.done;) {
                        const value = yield __await(source_21_1.value);
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
                catch (e_26_1) { e_26 = { error: e_26_1 }; }
                finally {
                    try {
                        if (source_21_1 && !source_21_1.done && (_a = source_21.return)) yield __await(_a.call(source_21));
                    }
                    finally { if (e_26) throw e_26.error; }
                }
                for (const value of keyMap) {
                    yield value;
                }
                var e_26, _a;
            });
        }
        return new BasicAsyncEnumerable(generate);
    }
    static join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_7() {
                const innerArray = [];
                try {
                    for (var inner_1 = __asyncValues(inner), inner_1_1; inner_1_1 = yield __await(inner_1.next()), !inner_1_1.done;) {
                        const i = yield __await(inner_1_1.value);
                        innerArray.push(i);
                    }
                }
                catch (e_27_1) { e_27 = { error: e_27_1 }; }
                finally {
                    try {
                        if (inner_1_1 && !inner_1_1.done && (_a = inner_1.return)) yield __await(_a.call(inner_1));
                    }
                    finally { if (e_27) throw e_27.error; }
                }
                try {
                    for (var outer_1 = __asyncValues(outer), outer_1_1; outer_1_1 = yield __await(outer_1.next()), !outer_1_1.done;) {
                        const o = yield __await(outer_1_1.value);
                        const outerKey = outerKeySelector(o);
                        for (const i of innerArray) {
                            const innerKey = innerKeySelector(i);
                            if (comparer(outerKey, innerKey) === true) {
                                yield resultSelector(o, i);
                            }
                        }
                    }
                }
                catch (e_28_1) { e_28 = { error: e_28_1 }; }
                finally {
                    try {
                        if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) yield __await(_b.call(outer_1));
                    }
                    finally { if (e_28) throw e_28.error; }
                }
                var e_27, _a, e_28, _b;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static intersect(first, second, comparer = shared_1.StrictEqualityComparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_8() {
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
                            yield firstValue;
                            break;
                        }
                    }
                }
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
            return __asyncGenerator(this, arguments, function* iterator_9() {
                try {
                    for (var source_22 = __asyncValues(source), source_22_1; source_22_1 = yield __await(source_22.next()), !source_22_1.done;) {
                        const value = yield __await(source_22_1.value);
                        yield selector(value);
                    }
                }
                catch (e_29_1) { e_29 = { error: e_29_1 }; }
                finally {
                    try {
                        if (source_22_1 && !source_22_1.done && (_a = source_22.return)) yield __await(_a.call(source_22));
                    }
                    finally { if (e_29) throw e_29.error; }
                }
                var e_29, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static select_2(source, key) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_10() {
                try {
                    for (var source_23 = __asyncValues(source), source_23_1; source_23_1 = yield __await(source_23.next()), !source_23_1.done;) {
                        const value = yield __await(source_23_1.value);
                        yield value[key];
                    }
                }
                catch (e_30_1) { e_30 = { error: e_30_1 }; }
                finally {
                    try {
                        if (source_23_1 && !source_23_1.done && (_a = source_23.return)) yield __await(_a.call(source_23));
                    }
                    finally { if (e_30) throw e_30.error; }
                }
                var e_30, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
            return __asyncGenerator(this, arguments, function* iterator_11() {
                try {
                    for (var source_24 = __asyncValues(source), source_24_1; source_24_1 = yield __await(source_24.next()), !source_24_1.done;) {
                        const value = yield __await(source_24_1.value);
                        for (const selectorValue of selector(value)) {
                            yield selectorValue;
                        }
                    }
                }
                catch (e_31_1) { e_31 = { error: e_31_1 }; }
                finally {
                    try {
                        if (source_24_1 && !source_24_1.done && (_a = source_24.return)) yield __await(_a.call(source_24));
                    }
                    finally { if (e_31) throw e_31.error; }
                }
                var e_31, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static selectMany_2(source, selector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_12() {
                try {
                    for (var source_25 = __asyncValues(source), source_25_1; source_25_1 = yield __await(source_25.next()), !source_25_1.done;) {
                        const value = yield __await(source_25_1.value);
                        for (const selectorValue of value[selector]) {
                            yield selectorValue;
                        }
                    }
                }
                catch (e_32_1) { e_32 = { error: e_32_1 }; }
                finally {
                    try {
                        if (source_25_1 && !source_25_1.done && (_a = source_25.return)) yield __await(_a.call(source_25));
                    }
                    finally { if (e_32) throw e_32.error; }
                }
                var e_32, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static single(source, predicate) {
        if (predicate) {
            return AsyncEnumerable.single_2(source, predicate);
        }
        else {
            return AsyncEnumerable.single_1(source);
        }
    }
    static single_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasValue = false;
            let singleValue = null;
            try {
                for (var source_26 = __asyncValues(source), source_26_1; source_26_1 = yield source_26.next(), !source_26_1.done;) {
                    const value = yield source_26_1.value;
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                    }
                    else {
                        hasValue = true;
                        singleValue = value;
                    }
                }
            }
            catch (e_33_1) { e_33 = { error: e_33_1 }; }
            finally {
                try {
                    if (source_26_1 && !source_26_1.done && (_a = source_26.return)) yield _a.call(source_26);
                }
                finally { if (e_33) throw e_33.error; }
            }
            if (hasValue === false) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return singleValue;
            var e_33, _a;
        });
    }
    static single_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasValue = false;
            let singleValue = null;
            try {
                for (var source_27 = __asyncValues(source), source_27_1; source_27_1 = yield source_27.next(), !source_27_1.done;) {
                    const value = yield source_27_1.value;
                    if (predicate(value)) {
                        if (hasValue === true) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else {
                            hasValue = true;
                            singleValue = value;
                        }
                    }
                }
            }
            catch (e_34_1) { e_34 = { error: e_34_1 }; }
            finally {
                try {
                    if (source_27_1 && !source_27_1.done && (_a = source_27.return)) yield _a.call(source_27);
                }
                finally { if (e_34) throw e_34.error; }
            }
            if (hasValue === false) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            }
            return singleValue;
            var e_34, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            let hasValue = false;
            let singleValue = null;
            try {
                for (var source_28 = __asyncValues(source), source_28_1; source_28_1 = yield source_28.next(), !source_28_1.done;) {
                    const value = yield source_28_1.value;
                    if (hasValue === true) {
                        throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                    }
                    else {
                        hasValue = true;
                        singleValue = value;
                    }
                }
            }
            catch (e_35_1) { e_35 = { error: e_35_1 }; }
            finally {
                try {
                    if (source_28_1 && !source_28_1.done && (_a = source_28.return)) yield _a.call(source_28);
                }
                finally { if (e_35) throw e_35.error; }
            }
            return singleValue;
            var e_35, _a;
        });
    }
    static singleOrDefault_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasValue = false;
            let singleValue = null;
            try {
                for (var source_29 = __asyncValues(source), source_29_1; source_29_1 = yield source_29.next(), !source_29_1.done;) {
                    const value = yield source_29_1.value;
                    if (predicate(value)) {
                        if (hasValue === true) {
                            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                        }
                        else {
                            hasValue = true;
                            singleValue = value;
                        }
                    }
                }
            }
            catch (e_36_1) { e_36 = { error: e_36_1 }; }
            finally {
                try {
                    if (source_29_1 && !source_29_1.done && (_a = source_29.return)) yield _a.call(source_29);
                }
                finally { if (e_36) throw e_36.error; }
            }
            return singleValue;
            var e_36, _a;
        });
    }
    static skip(source, count) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_13() {
                let i = 0;
                try {
                    for (var source_30 = __asyncValues(source), source_30_1; source_30_1 = yield __await(source_30.next()), !source_30_1.done;) {
                        const item = yield __await(source_30_1.value);
                        if (i++ >= count) {
                            yield item;
                        }
                    }
                }
                catch (e_37_1) { e_37 = { error: e_37_1 }; }
                finally {
                    try {
                        if (source_30_1 && !source_30_1.done && (_a = source_30.return)) yield __await(_a.call(source_30));
                    }
                    finally { if (e_37) throw e_37.error; }
                }
                var e_37, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
            return __asyncGenerator(this, arguments, function* iterator_14() {
                let skip = true;
                try {
                    for (var source_31 = __asyncValues(source), source_31_1; source_31_1 = yield __await(source_31.next()), !source_31_1.done;) {
                        const item = yield __await(source_31_1.value);
                        if (skip === false) {
                            yield item;
                        }
                        else if (predicate(item) === false) {
                            skip = false;
                            yield item;
                        }
                    }
                }
                catch (e_38_1) { e_38 = { error: e_38_1 }; }
                finally {
                    try {
                        if (source_31_1 && !source_31_1.done && (_a = source_31.return)) yield __await(_a.call(source_31));
                    }
                    finally { if (e_38) throw e_38.error; }
                }
                var e_38, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static skipWhile_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_15() {
                let index = 0;
                let skip = true;
                try {
                    for (var source_32 = __asyncValues(source), source_32_1; source_32_1 = yield __await(source_32.next()), !source_32_1.done;) {
                        const item = yield __await(source_32_1.value);
                        if (skip === false) {
                            yield item;
                        }
                        else if (predicate(item, index) === false) {
                            skip = false;
                            yield item;
                        }
                        index++;
                    }
                }
                catch (e_39_1) { e_39 = { error: e_39_1 }; }
                finally {
                    try {
                        if (source_32_1 && !source_32_1.done && (_a = source_32.return)) yield __await(_a.call(source_32));
                    }
                    finally { if (e_39) throw e_39.error; }
                }
                var e_39, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static ofType(source, type) {
        if (!type) {
            return source;
        }
        const typeCheck = typeof type === "string" ?
            ((x) => typeof x === type) :
            ((x) => x instanceof type);
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_16() {
                try {
                    for (var source_33 = __asyncValues(source), source_33_1; source_33_1 = yield __await(source_33.next()), !source_33_1.done;) {
                        const item = yield __await(source_33_1.value);
                        if (typeCheck(item)) {
                            yield item;
                        }
                    }
                }
                catch (e_40_1) { e_40 = { error: e_40_1 }; }
                finally {
                    try {
                        if (source_33_1 && !source_33_1.done && (_a = source_33.return)) yield __await(_a.call(source_33));
                    }
                    finally { if (e_40) throw e_40.error; }
                }
                var e_40, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static orderByInner(source, keySelector) {
        return function lazyMap() {
            return __awaiter(this, void 0, void 0, function* () {
                const map = new Map();
                try {
                    for (var source_34 = __asyncValues(source), source_34_1; source_34_1 = yield source_34.next(), !source_34_1.done;) {
                        const item = yield source_34_1.value;
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
                catch (e_41_1) { e_41 = { error: e_41_1 }; }
                finally {
                    try {
                        if (source_34_1 && !source_34_1.done && (_a = source_34.return)) yield _a.call(source_34);
                    }
                    finally { if (e_41) throw e_41.error; }
                }
                return map;
                var e_41, _a;
            });
        };
    }
    static orderBy(source, keySelector, comparer) {
        return new OrderedAsyncEnumerable(AsyncEnumerable.orderByInner(source, keySelector), comparer);
    }
    static orderByDescending(source, keySelector, comparer) {
        return new OrderedAsyncEnumerableDescending(AsyncEnumerable.orderByInner(source, keySelector), comparer);
    }
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
        return __awaiter(this, void 0, void 0, function* () {
            let last = null;
            try {
                for (var source_35 = __asyncValues(source), source_35_1; source_35_1 = yield source_35.next(), !source_35_1.done;) {
                    const value = yield source_35_1.value;
                    last = value;
                }
            }
            catch (e_42_1) { e_42 = { error: e_42_1 }; }
            finally {
                try {
                    if (source_35_1 && !source_35_1.done && (_a = source_35.return)) yield _a.call(source_35);
                }
                finally { if (e_42) throw e_42.error; }
            }
            if (!last) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return last;
            var e_42, _a;
        });
    }
    static last_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            let last = null;
            try {
                for (var source_36 = __asyncValues(source), source_36_1; source_36_1 = yield source_36.next(), !source_36_1.done;) {
                    const value = yield source_36_1.value;
                    if (predicate(value) === true) {
                        last = value;
                    }
                }
            }
            catch (e_43_1) { e_43 = { error: e_43_1 }; }
            finally {
                try {
                    if (source_36_1 && !source_36_1.done && (_a = source_36.return)) yield _a.call(source_36);
                }
                finally { if (e_43) throw e_43.error; }
            }
            if (!last) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            }
            return last;
            var e_43, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            let last = null;
            try {
                for (var source_37 = __asyncValues(source), source_37_1; source_37_1 = yield source_37.next(), !source_37_1.done;) {
                    const value = yield source_37_1.value;
                    last = value;
                }
            }
            catch (e_44_1) { e_44 = { error: e_44_1 }; }
            finally {
                try {
                    if (source_37_1 && !source_37_1.done && (_a = source_37.return)) yield _a.call(source_37);
                }
                finally { if (e_44) throw e_44.error; }
            }
            return last;
            var e_44, _a;
        });
    }
    static lastOrDefault_2(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            let last = null;
            try {
                for (var source_38 = __asyncValues(source), source_38_1; source_38_1 = yield source_38.next(), !source_38_1.done;) {
                    const value = yield source_38_1.value;
                    if (predicate(value) === true) {
                        last = value;
                    }
                }
            }
            catch (e_45_1) { e_45 = { error: e_45_1 }; }
            finally {
                try {
                    if (source_38_1 && !source_38_1.done && (_a = source_38.return)) yield _a.call(source_38);
                }
                finally { if (e_45) throw e_45.error; }
            }
            return last;
            var e_45, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            let max = null;
            try {
                for (var source_39 = __asyncValues(source), source_39_1; source_39_1 = yield source_39.next(), !source_39_1.done;) {
                    const item = yield source_39_1.value;
                    max = Math.max(max || Number.MIN_VALUE, item);
                }
            }
            catch (e_46_1) { e_46 = { error: e_46_1 }; }
            finally {
                try {
                    if (source_39_1 && !source_39_1.done && (_a = source_39.return)) yield _a.call(source_39);
                }
                finally { if (e_46) throw e_46.error; }
            }
            if (max === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return max;
            }
            var e_46, _a;
        });
    }
    static max_2(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let max = null;
            try {
                for (var source_40 = __asyncValues(source), source_40_1; source_40_1 = yield source_40.next(), !source_40_1.done;) {
                    const item = yield source_40_1.value;
                    max = Math.max(max || Number.MIN_VALUE, selector(item));
                }
            }
            catch (e_47_1) { e_47 = { error: e_47_1 }; }
            finally {
                try {
                    if (source_40_1 && !source_40_1.done && (_a = source_40.return)) yield _a.call(source_40);
                }
                finally { if (e_47) throw e_47.error; }
            }
            if (max === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return max;
            }
            var e_47, _a;
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
        return __awaiter(this, void 0, void 0, function* () {
            let min = null;
            try {
                for (var source_41 = __asyncValues(source), source_41_1; source_41_1 = yield source_41.next(), !source_41_1.done;) {
                    const item = yield source_41_1.value;
                    min = Math.min(min || Number.MAX_VALUE, item);
                }
            }
            catch (e_48_1) { e_48 = { error: e_48_1 }; }
            finally {
                try {
                    if (source_41_1 && !source_41_1.done && (_a = source_41.return)) yield _a.call(source_41);
                }
                finally { if (e_48) throw e_48.error; }
            }
            if (min === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return min;
            }
            var e_48, _a;
        });
    }
    static min_2(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let min = null;
            try {
                for (var source_42 = __asyncValues(source), source_42_1; source_42_1 = yield source_42.next(), !source_42_1.done;) {
                    const item = yield source_42_1.value;
                    min = Math.min(min || Number.MAX_VALUE, selector(item));
                }
            }
            catch (e_49_1) { e_49 = { error: e_49_1 }; }
            finally {
                try {
                    if (source_42_1 && !source_42_1.done && (_a = source_42.return)) yield _a.call(source_42);
                }
                finally { if (e_49) throw e_49.error; }
            }
            if (min === null) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            else {
                return min;
            }
            var e_49, _a;
        });
    }
    static range(start, count) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_17() {
                const max = start + count;
                for (let i = start; i < max; i++) {
                    yield i;
                }
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static repeat(element, count, delay) {
        if (delay) {
            return AsyncEnumerable.repeat_2(element, count, delay);
        }
        else {
            return AsyncEnumerable.repeat_1(element, count);
        }
    }
    static repeat_1(element, count) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_18() {
                for (let i = 0; i < count; i++) {
                    yield element;
                }
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static repeat_2(element, count, delay) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_19() {
                for (let i = 0; i < count; i++) {
                    yield yield __await(new Promise((resolve) => setTimeout(() => resolve(element), delay)));
                }
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static reverse(source) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_20() {
                const values = [];
                try {
                    for (var source_43 = __asyncValues(source), source_43_1; source_43_1 = yield __await(source_43.next()), !source_43_1.done;) {
                        const value = yield __await(source_43_1.value);
                        values.push(value);
                    }
                }
                catch (e_50_1) { e_50 = { error: e_50_1 }; }
                finally {
                    try {
                        if (source_43_1 && !source_43_1.done && (_a = source_43.return)) yield __await(_a.call(source_43));
                    }
                    finally { if (e_50) throw e_50.error; }
                }
                for (let i = values.length - 1; i >= 0; i--) {
                    yield values[i];
                }
                var e_50, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
    static sum(source, selector) {
        if (selector) {
            return AsyncEnumerable.sum_2(source, selector);
        }
        else {
            return AsyncEnumerable.sum_1(source);
        }
    }
    static sum_1(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let sum = 0;
            try {
                for (var source_44 = __asyncValues(source), source_44_1; source_44_1 = yield source_44.next(), !source_44_1.done;) {
                    const value = yield source_44_1.value;
                    sum += value;
                }
            }
            catch (e_51_1) { e_51 = { error: e_51_1 }; }
            finally {
                try {
                    if (source_44_1 && !source_44_1.done && (_a = source_44.return)) yield _a.call(source_44);
                }
                finally { if (e_51) throw e_51.error; }
            }
            return sum;
            var e_51, _a;
        });
    }
    static sum_2(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let sum = 0;
            try {
                for (var source_45 = __asyncValues(source), source_45_1; source_45_1 = yield source_45.next(), !source_45_1.done;) {
                    const value = yield source_45_1.value;
                    sum += selector(value);
                }
            }
            catch (e_52_1) { e_52 = { error: e_52_1 }; }
            finally {
                try {
                    if (source_45_1 && !source_45_1.done && (_a = source_45.return)) yield _a.call(source_45);
                }
                finally { if (e_52) throw e_52.error; }
            }
            return sum;
            var e_52, _a;
        });
    }
    static take(source, amount) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_21() {
                let amountLeft = amount > 0 ? amount : 0;
                try {
                    for (var source_46 = __asyncValues(source), source_46_1; source_46_1 = yield __await(source_46.next()), !source_46_1.done;) {
                        const item = yield __await(source_46_1.value);
                        if (amountLeft-- === 0) {
                            break;
                        }
                        else {
                            yield item;
                        }
                    }
                }
                catch (e_53_1) { e_53 = { error: e_53_1 }; }
                finally {
                    try {
                        if (source_46_1 && !source_46_1.done && (_a = source_46.return)) yield __await(_a.call(source_46));
                    }
                    finally { if (e_53) throw e_53.error; }
                }
                var e_53, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
            return __asyncGenerator(this, arguments, function* iterator_22() {
                try {
                    for (var source_47 = __asyncValues(source), source_47_1; source_47_1 = yield __await(source_47.next()), !source_47_1.done;) {
                        const item = yield __await(source_47_1.value);
                        if (predicate(item)) {
                            yield item;
                        }
                        else {
                            break;
                        }
                    }
                }
                catch (e_54_1) { e_54 = { error: e_54_1 }; }
                finally {
                    try {
                        if (source_47_1 && !source_47_1.done && (_a = source_47.return)) yield __await(_a.call(source_47));
                    }
                    finally { if (e_54) throw e_54.error; }
                }
                var e_54, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static takeWhile_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_23() {
                let index = 0;
                try {
                    for (var source_48 = __asyncValues(source), source_48_1; source_48_1 = yield __await(source_48.next()), !source_48_1.done;) {
                        const item = yield __await(source_48_1.value);
                        if (predicate(item, index++)) {
                            yield item;
                        }
                        else {
                            break;
                        }
                    }
                }
                catch (e_55_1) { e_55 = { error: e_55_1 }; }
                finally {
                    try {
                        if (source_48_1 && !source_48_1.done && (_a = source_48.return)) yield __await(_a.call(source_48));
                    }
                    finally { if (e_55) throw e_55.error; }
                }
                var e_55, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static thenBy(source, keySelector, comparer) {
        function sortInnerMost(item) {
            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key)));
                }
                return item;
            }
            else {
                const map = new Map();
                for (let i = 0; i < item.length; i++) {
                    const value = item[i];
                    const key = keySelector(value);
                    const mapping = map.get(key);
                    if (mapping) {
                        mapping.push(value);
                    }
                    else {
                        map.set(key, [value]);
                    }
                }
                return map;
            }
        }
        return new OrderedAsyncEnumerable(() => __awaiter(this, void 0, void 0, function* () { return sortInnerMost(yield source.getMap()); }), comparer);
    }
    static thenByDescending(source, keySelector, comparer) {
        function sortInnerMost(item) {
            if (item instanceof Map) {
                for (const key of item.keys()) {
                    item.set(key, sortInnerMost(item.get(key)));
                }
                return item;
            }
            else {
                const map = new Map();
                for (let i = 0; i < item.length; i++) {
                    const value = item[i];
                    const key = keySelector(value);
                    const mapping = map.get(key);
                    if (mapping) {
                        mapping.push(value);
                    }
                    else {
                        map.set(key, [value]);
                    }
                }
                return map;
            }
        }
        return new OrderedAsyncEnumerableDescending(() => __awaiter(this, void 0, void 0, function* () { return sortInnerMost(yield source.getMap()); }), comparer);
    }
    static toArray(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const array = [];
            try {
                for (var source_49 = __asyncValues(source), source_49_1; source_49_1 = yield source_49.next(), !source_49_1.done;) {
                    const item = yield source_49_1.value;
                    array.push(item);
                }
            }
            catch (e_56_1) { e_56 = { error: e_56_1 }; }
            finally {
                try {
                    if (source_49_1 && !source_49_1.done && (_a = source_49.return)) yield _a.call(source_49);
                }
                finally { if (e_56) throw e_56.error; }
            }
            return array;
            var e_56, _a;
        });
    }
    static toMap(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = new Map();
            try {
                for (var source_50 = __asyncValues(source), source_50_1; source_50_1 = yield source_50.next(), !source_50_1.done;) {
                    const value = yield source_50_1.value;
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
            catch (e_57_1) { e_57 = { error: e_57_1 }; }
            finally {
                try {
                    if (source_50_1 && !source_50_1.done && (_a = source_50.return)) yield _a.call(source_50);
                }
                finally { if (e_57) throw e_57.error; }
            }
            return map;
            var e_57, _a;
        });
    }
    static toObject(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = {};
            try {
                for (var source_51 = __asyncValues(source), source_51_1; source_51_1 = yield source_51.next(), !source_51_1.done;) {
                    const value = yield source_51_1.value;
                    map[selector(value)] = value;
                }
            }
            catch (e_58_1) { e_58 = { error: e_58_1 }; }
            finally {
                try {
                    if (source_51_1 && !source_51_1.done && (_a = source_51.return)) yield _a.call(source_51);
                }
                finally { if (e_58) throw e_58.error; }
            }
            return map;
            var e_58, _a;
        });
    }
    static toSet(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const set = new Set();
            try {
                for (var source_52 = __asyncValues(source), source_52_1; source_52_1 = yield source_52.next(), !source_52_1.done;) {
                    const item = yield source_52_1.value;
                    set.add(item);
                }
            }
            catch (e_59_1) { e_59 = { error: e_59_1 }; }
            finally {
                try {
                    if (source_52_1 && !source_52_1.done && (_a = source_52.return)) yield _a.call(source_52);
                }
                finally { if (e_59) throw e_59.error; }
            }
            return set;
            var e_59, _a;
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
            return __asyncGenerator(this, arguments, function* iterator_24() {
                const set = new Set();
                try {
                    for (var first_4 = __asyncValues(first), first_4_1; first_4_1 = yield __await(first_4.next()), !first_4_1.done;) {
                        const item = yield __await(first_4_1.value);
                        if (set.has(item) === false) {
                            yield item;
                            set.add(item);
                        }
                    }
                }
                catch (e_60_1) { e_60 = { error: e_60_1 }; }
                finally {
                    try {
                        if (first_4_1 && !first_4_1.done && (_a = first_4.return)) yield __await(_a.call(first_4));
                    }
                    finally { if (e_60) throw e_60.error; }
                }
                try {
                    for (var second_2 = __asyncValues(second), second_2_1; second_2_1 = yield __await(second_2.next()), !second_2_1.done;) {
                        const item = yield __await(second_2_1.value);
                        if (set.has(item) === false) {
                            yield item;
                            set.add(item);
                        }
                    }
                }
                catch (e_61_1) { e_61 = { error: e_61_1 }; }
                finally {
                    try {
                        if (second_2_1 && !second_2_1.done && (_b = second_2.return)) yield __await(_b.call(second_2));
                    }
                    finally { if (e_61) throw e_61.error; }
                }
                var e_60, _a, e_61, _b;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static union_2(first, second, comparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_25() {
                const result = [];
                for (const source of [first, second]) {
                    try {
                        for (var source_53 = __asyncValues(source), source_53_1; source_53_1 = yield __await(source_53.next()), !source_53_1.done;) {
                            const value = yield __await(source_53_1.value);
                            let exists = false;
                            for (const resultValue of result) {
                                if (comparer(value, resultValue) === true) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (exists === false) {
                                yield value;
                                result.push(value);
                            }
                        }
                    }
                    catch (e_62_1) { e_62 = { error: e_62_1 }; }
                    finally {
                        try {
                            if (source_53_1 && !source_53_1.done && (_a = source_53.return)) yield __await(_a.call(source_53));
                        }
                        finally { if (e_62) throw e_62.error; }
                    }
                }
                var e_62, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
            return __asyncGenerator(this, arguments, function* iterator_26() {
                try {
                    for (var source_54 = __asyncValues(source), source_54_1; source_54_1 = yield __await(source_54.next()), !source_54_1.done;) {
                        const item = yield __await(source_54_1.value);
                        if (predicate(item) === true) {
                            yield item;
                        }
                    }
                }
                catch (e_63_1) { e_63 = { error: e_63_1 }; }
                finally {
                    try {
                        if (source_54_1 && !source_54_1.done && (_a = source_54.return)) yield __await(_a.call(source_54));
                    }
                    finally { if (e_63) throw e_63.error; }
                }
                var e_63, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static where_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_27() {
                let i = 0;
                try {
                    for (var source_55 = __asyncValues(source), source_55_1; source_55_1 = yield __await(source_55.next()), !source_55_1.done;) {
                        const item = yield __await(source_55_1.value);
                        if (predicate(item, i++) === true) {
                            yield item;
                        }
                    }
                }
                catch (e_64_1) { e_64 = { error: e_64_1 }; }
                finally {
                    try {
                        if (source_55_1 && !source_55_1.done && (_a = source_55.return)) yield __await(_a.call(source_55));
                    }
                    finally { if (e_64) throw e_64.error; }
                }
                var e_64, _a;
            });
        }
        return new BasicAsyncEnumerable(iterator);
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
            return __asyncGenerator(this, arguments, function* iterator_28() {
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
                        yield shared_1.AsTuple(a.value, b.value);
                    }
                }
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    static zip_2(source, second, resultSelector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_29() {
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
                        yield resultSelector(a.value, b.value);
                    }
                }
            });
        }
        return new BasicAsyncEnumerable(iterator);
    }
    constructor() { }
}
exports.AsyncEnumerable = AsyncEnumerable;
