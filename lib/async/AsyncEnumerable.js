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
const AsyncEnumerablePrivate = require("./AsyncEnumerablePrivate");
const BasicAsyncEnumerable_1 = require("./BasicAsyncEnumerable");
const OrderedAsyncEnumerable_1 = require("./OrderedAsyncEnumerable");
// tslint:disable:no-shadowed-variable
/**
 * Provides static methods that work with IAsyncEnumerable<T> and AsyncIterable<T>
 */
var aggregate_1 = require("./_private/aggregate");
exports.aggregate = aggregate_1.aggregate;
var all_1 = require("./_private/all");
exports.all = all_1.all;
function allAsync(source, predicate) {
    var source_1, source_1_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        try {
            for (source_1 = __asyncValues(source); source_1_1 = yield source_1.next(), !source_1_1.done;) {
                const item = source_1_1.value;
                if ((yield predicate(item)) === false) {
                    return false;
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
        return true;
    });
}
exports.allAsync = allAsync;
function any(source, predicate) {
    if (predicate) {
        return AsyncEnumerablePrivate.any_2(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.any_1(source);
    }
}
exports.any = any;
function anyAsync(source, predicate) {
    var source_2, source_2_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_2, _a;
        try {
            for (source_2 = __asyncValues(source); source_2_1 = yield source_2.next(), !source_2_1.done;) {
                const item = source_2_1.value;
                if ((yield predicate(item)) === true) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield _a.call(source_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    });
}
exports.anyAsync = anyAsync;
function average(source, selector) {
    if (selector) {
        return AsyncEnumerablePrivate.average_2(source, selector);
    }
    else {
        return AsyncEnumerablePrivate.average_1(source);
    }
}
exports.average = average;
function asParallel(source) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            var e_3, _a;
            const data = [];
            try {
                for (var source_3 = __asyncValues(source), source_3_1; source_3_1 = yield source_3.next(), !source_3_1.done;) {
                    const value = source_3_1.value;
                    data.push(value);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (source_3_1 && !source_3_1.done && (_a = source_3.return)) yield _a.call(source_3);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return data;
        });
    }
    return parallel_1.from(0 /* PromiseToArray */, generator);
}
exports.asParallel = asParallel;
function averageAsync(source, func) {
    var source_4, source_4_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_4, _a;
        let value;
        let count;
        try {
            for (source_4 = __asyncValues(source); source_4_1 = yield source_4.next(), !source_4_1.done;) {
                const item = source_4_1.value;
                value = (value || 0) + (yield func(item));
                count = (count || 0) + 1;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (source_4_1 && !source_4_1.done && (_a = source_4.return)) yield _a.call(source_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (value === undefined) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
exports.averageAsync = averageAsync;
function concat(first, second) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            yield __await(yield* __asyncDelegator(__asyncValues(first)));
            yield __await(yield* __asyncDelegator(__asyncValues(second)));
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.concat = concat;
function contains(source, value, comparer = shared_1.StrictEqualityComparer) {
    var source_5, source_5_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_5, _a;
        try {
            for (source_5 = __asyncValues(source); source_5_1 = yield source_5.next(), !source_5_1.done;) {
                const item = source_5_1.value;
                if (comparer(value, item)) {
                    return true;
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
        return false;
    });
}
exports.contains = contains;
function containsAsync(source, value, comparer) {
    var source_6, source_6_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_6, _a;
        try {
            for (source_6 = __asyncValues(source); source_6_1 = yield source_6.next(), !source_6_1.done;) {
                const item = source_6_1.value;
                if (yield comparer(value, item)) {
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
    });
}
exports.containsAsync = containsAsync;
function count(source, predicate) {
    if (predicate) {
        return AsyncEnumerablePrivate.count_2(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.count_1(source);
    }
}
exports.count = count;
function countAsync(source, predicate) {
    var source_7, source_7_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_7, _a;
        let count = 0;
        try {
            for (source_7 = __asyncValues(source); source_7_1 = yield source_7.next(), !source_7_1.done;) {
                const value = source_7_1.value;
                if ((yield predicate(value)) === true) {
                    count++;
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
        return count;
    });
}
exports.countAsync = countAsync;
function distinct(source, comparer = shared_1.StrictEqualityComparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            var e_8, _a;
            const distinctElements = [];
            try {
                for (var source_8 = __asyncValues(source), source_8_1; source_8_1 = yield __await(source_8.next()), !source_8_1.done;) {
                    const item = source_8_1.value;
                    const foundItem = distinctElements.find((x) => comparer(x, item));
                    if (!foundItem) {
                        distinctElements.push(item);
                        yield yield __await(item);
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield __await(_a.call(source_8));
                }
                finally { if (e_8) throw e_8.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.distinct = distinct;
function distinctAsync(source, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            var e_9, _a;
            const distinctElements = [];
            try {
                outerLoop: for (var source_9 = __asyncValues(source), source_9_1; source_9_1 = yield __await(source_9.next()), !source_9_1.done;) {
                    const item = source_9_1.value;
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
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield __await(_a.call(source_9));
                }
                finally { if (e_9) throw e_9.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.distinctAsync = distinctAsync;
/**
 * @throws {ArgumentOutOfRangeException}
 */
function elementAt(source, index) {
    var source_10, source_10_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_10, _a;
        if (index < 0) {
            throw new shared_1.ArgumentOutOfRangeException("index");
        }
        let i = 0;
        try {
            for (source_10 = __asyncValues(source); source_10_1 = yield source_10.next(), !source_10_1.done;) {
                const item = source_10_1.value;
                if (index === i++) {
                    return item;
                }
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield _a.call(source_10);
            }
            finally { if (e_10) throw e_10.error; }
        }
        throw new shared_1.ArgumentOutOfRangeException("index");
    });
}
exports.elementAt = elementAt;
function elementAtOrDefault(source, index) {
    var source_11, source_11_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_11, _a;
        let i = 0;
        try {
            for (source_11 = __asyncValues(source); source_11_1 = yield source_11.next(), !source_11_1.done;) {
                const item = source_11_1.value;
                if (index === i++) {
                    return item;
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
        return null;
    });
}
exports.elementAtOrDefault = elementAtOrDefault;
function empty() {
    function iterable() {
        return __asyncGenerator(this, arguments, function* iterable_1() {
            var e_12, _a;
            try {
                for (var _b = __asyncValues([]), _c; _c = yield __await(_b.next()), !_c.done;) {
                    const _ = _c.value;
                    yield yield __await(_);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                }
                finally { if (e_12) throw e_12.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterable);
}
exports.empty = empty;
function enumerateObject(source) {
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
exports.enumerateObject = enumerateObject;
// tslint:disable:no-shadowed-variable
function except(first, second, comparer = shared_1.EqualityComparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_4() {
            var e_13, _a, e_14, _b;
            // TODO: async eq of [...second] ?
            const secondArray = [];
            try {
                for (var second_1 = __asyncValues(second), second_1_1; second_1_1 = yield __await(second_1.next()), !second_1_1.done;) {
                    const x = second_1_1.value;
                    secondArray.push(x);
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (second_1_1 && !second_1_1.done && (_a = second_1.return)) yield __await(_a.call(second_1));
                }
                finally { if (e_13) throw e_13.error; }
            }
            try {
                for (var first_3 = __asyncValues(first), first_3_1; first_3_1 = yield __await(first_3.next()), !first_3_1.done;) {
                    const firstItem = first_3_1.value;
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
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (first_3_1 && !first_3_1.done && (_b = first_3.return)) yield __await(_b.call(first_3));
                }
                finally { if (e_14) throw e_14.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.except = except;
function exceptAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_5() {
            var e_15, _a, e_16, _b;
            // TODO: async eq of [...second] ?
            const secondArray = [];
            try {
                for (var second_2 = __asyncValues(second), second_2_1; second_2_1 = yield __await(second_2.next()), !second_2_1.done;) {
                    const x = second_2_1.value;
                    secondArray.push(x);
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (second_2_1 && !second_2_1.done && (_a = second_2.return)) yield __await(_a.call(second_2));
                }
                finally { if (e_15) throw e_15.error; }
            }
            try {
                for (var first_4 = __asyncValues(first), first_4_1; first_4_1 = yield __await(first_4.next()), !first_4_1.done;) {
                    const firstItem = first_4_1.value;
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
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (first_4_1 && !first_4_1.done && (_b = first_4.return)) yield __await(_b.call(first_4));
                }
                finally { if (e_16) throw e_16.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.exceptAsync = exceptAsync;
/**
 * @throws {InvalidOperationException} There are no elements
 */
function first(source, predicate) {
    if (predicate) {
        return AsyncEnumerablePrivate.first_2(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.first_1(source);
    }
}
exports.first = first;
/**
 * @throws {InvalidOperationException} There are no elements matching predicate
 */
function firstAsync(source, predicate) {
    var source_12, source_12_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_17, _a;
        try {
            for (source_12 = __asyncValues(source); source_12_1 = yield source_12.next(), !source_12_1.done;) {
                const value = source_12_1.value;
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (source_12_1 && !source_12_1.done && (_a = source_12.return)) yield _a.call(source_12);
            }
            finally { if (e_17) throw e_17.error; }
        }
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    });
}
exports.firstAsync = firstAsync;
function firstOrDefault(source, predicate) {
    if (predicate) {
        return AsyncEnumerablePrivate.firstOrDefault_2(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.firstOrDefault_1(source);
    }
}
exports.firstOrDefault = firstOrDefault;
function firstOrDefaultAsync(source, predicate) {
    var source_13, source_13_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_18, _a;
        try {
            for (source_13 = __asyncValues(source); source_13_1 = yield source_13.next(), !source_13_1.done;) {
                const value = source_13_1.value;
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
        }
        catch (e_18_1) { e_18 = { error: e_18_1 }; }
        finally {
            try {
                if (source_13_1 && !source_13_1.done && (_a = source_13.return)) yield _a.call(source_13);
            }
            finally { if (e_18) throw e_18.error; }
        }
        return null;
    });
}
exports.firstOrDefaultAsync = firstOrDefaultAsync;
function flatten(source, shallow) {
    function iterator(sourceInner) {
        return __asyncGenerator(this, arguments, function* iterator_6() {
            var e_19, _a, e_20, _b;
            try {
                for (var sourceInner_1 = __asyncValues(sourceInner), sourceInner_1_1; sourceInner_1_1 = yield __await(sourceInner_1.next()), !sourceInner_1_1.done;) {
                    const item = sourceInner_1_1.value;
                    if (item[Symbol.asyncIterator] !== undefined) {
                        const items = shallow ? item : iterator(item);
                        try {
                            for (var items_1 = __asyncValues(items), items_1_1; items_1_1 = yield __await(items_1.next()), !items_1_1.done;) {
                                const inner = items_1_1.value;
                                yield yield __await(inner);
                            }
                        }
                        catch (e_20_1) { e_20 = { error: e_20_1 }; }
                        finally {
                            try {
                                if (items_1_1 && !items_1_1.done && (_b = items_1.return)) yield __await(_b.call(items_1));
                            }
                            finally { if (e_20) throw e_20.error; }
                        }
                    }
                    else {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (sourceInner_1_1 && !sourceInner_1_1.done && (_a = sourceInner_1.return)) yield __await(_a.call(sourceInner_1));
                }
                finally { if (e_19) throw e_19.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(() => iterator(source));
}
exports.flatten = flatten;
function from(promisesOrIterable) {
    if (Array.isArray(promisesOrIterable)) {
        if (promisesOrIterable.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(function () {
            return __asyncGenerator(this, arguments, function* () {
                var e_21, _a;
                try {
                    for (var promisesOrIterable_1 = __asyncValues(promisesOrIterable), promisesOrIterable_1_1; promisesOrIterable_1_1 = yield __await(promisesOrIterable_1.next()), !promisesOrIterable_1_1.done;) {
                        const value = promisesOrIterable_1_1.value;
                        yield yield __await(value);
                    }
                }
                catch (e_21_1) { e_21 = { error: e_21_1 }; }
                finally {
                    try {
                        if (promisesOrIterable_1_1 && !promisesOrIterable_1_1.done && (_a = promisesOrIterable_1.return)) yield __await(_a.call(promisesOrIterable_1));
                    }
                    finally { if (e_21) throw e_21.error; }
                }
            });
        });
    }
    else {
        return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(promisesOrIterable);
    }
}
exports.from = from;
function fromEvent(element, type) {
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
exports.fromEvent = fromEvent;
function each(source, action) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_7() {
            var e_22, _a;
            try {
                for (var source_14 = __asyncValues(source), source_14_1; source_14_1 = yield __await(source_14.next()), !source_14_1.done;) {
                    const value = source_14_1.value;
                    action(value);
                    yield yield __await(value);
                }
            }
            catch (e_22_1) { e_22 = { error: e_22_1 }; }
            finally {
                try {
                    if (source_14_1 && !source_14_1.done && (_a = source_14.return)) yield __await(_a.call(source_14));
                }
                finally { if (e_22) throw e_22.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.each = each;
function eachAsync(source, action) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_8() {
            var e_23, _a;
            try {
                for (var source_15 = __asyncValues(source), source_15_1; source_15_1 = yield __await(source_15.next()), !source_15_1.done;) {
                    const value = source_15_1.value;
                    yield __await(action(value));
                    yield yield __await(value);
                }
            }
            catch (e_23_1) { e_23 = { error: e_23_1 }; }
            finally {
                try {
                    if (source_15_1 && !source_15_1.done && (_a = source_15.return)) yield __await(_a.call(source_15));
                }
                finally { if (e_23) throw e_23.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.eachAsync = eachAsync;
function groupBy(source, keySelector, comparer) {
    if (comparer) {
        return AsyncEnumerablePrivate.groupBy_0(source, keySelector, comparer);
    }
    else {
        return AsyncEnumerablePrivate.groupBy_0_Simple(source, keySelector);
    }
}
exports.groupBy = groupBy;
function groupByAsync(source, keySelector, comparer) {
    if (comparer) {
        return AsyncEnumerablePrivate.groupByAsync_0(source, keySelector, comparer);
    }
    else {
        return AsyncEnumerablePrivate.groupByAsync_0_Simple(source, keySelector);
    }
}
exports.groupByAsync = groupByAsync;
function groupByWithSel(source, keySelector, elementSelector, comparer) {
    if (comparer) {
        return AsyncEnumerablePrivate.groupBy_1(source, keySelector, elementSelector, comparer);
    }
    else {
        return AsyncEnumerablePrivate.groupBy_1_Simple(source, keySelector, elementSelector);
    }
}
exports.groupByWithSel = groupByWithSel;
function join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_9() {
            var e_24, _a, e_25, _b;
            const innerArray = [];
            try {
                for (var inner_1 = __asyncValues(inner), inner_1_1; inner_1_1 = yield __await(inner_1.next()), !inner_1_1.done;) {
                    const i = inner_1_1.value;
                    innerArray.push(i);
                }
            }
            catch (e_24_1) { e_24 = { error: e_24_1 }; }
            finally {
                try {
                    if (inner_1_1 && !inner_1_1.done && (_a = inner_1.return)) yield __await(_a.call(inner_1));
                }
                finally { if (e_24) throw e_24.error; }
            }
            try {
                for (var outer_1 = __asyncValues(outer), outer_1_1; outer_1_1 = yield __await(outer_1.next()), !outer_1_1.done;) {
                    const o = outer_1_1.value;
                    const outerKey = outerKeySelector(o);
                    for (const i of innerArray) {
                        const innerKey = innerKeySelector(i);
                        if (comparer(outerKey, innerKey) === true) {
                            yield yield __await(resultSelector(o, i));
                        }
                    }
                }
            }
            catch (e_25_1) { e_25 = { error: e_25_1 }; }
            finally {
                try {
                    if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) yield __await(_b.call(outer_1));
                }
                finally { if (e_25) throw e_25.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.join = join;
// tslint:disable:no-shadowed-variable
function intersect(first, second, comparer = shared_1.StrictEqualityComparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_10() {
            const firstResults = yield __await(first.distinct(comparer).toArray());
            if (firstResults.length === 0) {
                return yield __await(void 0);
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
exports.intersect = intersect;
function intersectAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_11() {
            const firstResults = yield __await(first.distinctAsync(comparer).toArray());
            if (firstResults.length === 0) {
                return yield __await(void 0);
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
exports.intersectAsync = intersectAsync;
function select(source, selector) {
    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.select_2(source, selector);
    }
    else {
        return AsyncEnumerablePrivate.select_1(source, selector);
    }
}
exports.select = select;
function selectAsync(source, selector) {
    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.selectAsync_2(source, selector);
    }
    else {
        return AsyncEnumerablePrivate.selectAsync_1(source, selector);
    }
}
exports.selectAsync = selectAsync;
function selectMany(source, selector) {
    if (typeof selector === "string") {
        return AsyncEnumerablePrivate.selectMany_2(source, selector);
    }
    else {
        return AsyncEnumerablePrivate.selectMany_1(source, selector);
    }
}
exports.selectMany = selectMany;
function selectManyAsync(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_12() {
            var e_26, _a;
            try {
                for (var source_16 = __asyncValues(source), source_16_1; source_16_1 = yield __await(source_16.next()), !source_16_1.done;) {
                    const value = source_16_1.value;
                    const many = yield __await(selector(value));
                    for (const innerValue of many) {
                        yield yield __await(innerValue);
                    }
                }
            }
            catch (e_26_1) { e_26 = { error: e_26_1 }; }
            finally {
                try {
                    if (source_16_1 && !source_16_1.done && (_a = source_16.return)) yield __await(_a.call(source_16));
                }
                finally { if (e_26) throw e_26.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.selectManyAsync = selectManyAsync;
/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
function single(source, predicate) {
    if (predicate) {
        return AsyncEnumerablePrivate.single_2(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.single_1(source);
    }
}
exports.single = single;
/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
function singleAsync(source, predicate) {
    var source_17, source_17_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_27, _a;
        let hasValue = false;
        let singleValue = null;
        try {
            for (source_17 = __asyncValues(source); source_17_1 = yield source_17.next(), !source_17_1.done;) {
                const value = source_17_1.value;
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
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (source_17_1 && !source_17_1.done && (_a = source_17.return)) yield _a.call(source_17);
            }
            finally { if (e_27) throw e_27.error; }
        }
        if (hasValue === false) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        }
        return singleValue;
    });
}
exports.singleAsync = singleAsync;
function singleOrDefault(source, predicate) {
    if (predicate) {
        return AsyncEnumerablePrivate.singleOrDefault_2(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.singleOrDefault_1(source);
    }
}
exports.singleOrDefault = singleOrDefault;
function singleOrDefaultAsync(source, predicate) {
    var source_18, source_18_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_28, _a;
        let hasValue = false;
        let singleValue = null;
        try {
            for (source_18 = __asyncValues(source); source_18_1 = yield source_18.next(), !source_18_1.done;) {
                const value = source_18_1.value;
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
        catch (e_28_1) { e_28 = { error: e_28_1 }; }
        finally {
            try {
                if (source_18_1 && !source_18_1.done && (_a = source_18.return)) yield _a.call(source_18);
            }
            finally { if (e_28) throw e_28.error; }
        }
        return singleValue;
    });
}
exports.singleOrDefaultAsync = singleOrDefaultAsync;
function skip(source, count) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_13() {
            var e_29, _a;
            let i = 0;
            try {
                for (var source_19 = __asyncValues(source), source_19_1; source_19_1 = yield __await(source_19.next()), !source_19_1.done;) {
                    const item = source_19_1.value;
                    if (i++ >= count) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_29_1) { e_29 = { error: e_29_1 }; }
            finally {
                try {
                    if (source_19_1 && !source_19_1.done && (_a = source_19.return)) yield __await(_a.call(source_19));
                }
                finally { if (e_29) throw e_29.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skip = skip;
function skipWhile(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhile_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.skipWhile_2(source, predicate);
    }
}
exports.skipWhile = skipWhile;
function skipWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhileAsync_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.skipWhileAsync_2(source, predicate);
    }
}
exports.skipWhileAsync = skipWhileAsync;
function ofType(source, type) {
    const typeCheck = typeof type === "string" ?
        ((x) => typeof x === type) :
        ((x) => x instanceof type);
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_14() {
            var e_30, _a;
            try {
                for (var source_20 = __asyncValues(source), source_20_1; source_20_1 = yield __await(source_20.next()), !source_20_1.done;) {
                    const item = source_20_1.value;
                    if (typeCheck(item)) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_30_1) { e_30 = { error: e_30_1 }; }
            finally {
                try {
                    if (source_20_1 && !source_20_1.done && (_a = source_20.return)) yield __await(_a.call(source_20));
                }
                finally { if (e_30) throw e_30.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.ofType = ofType;
function orderBy(source, keySelector, comparer) {
    return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generate(source, keySelector, true, comparer);
}
exports.orderBy = orderBy;
function orderByAsync(source, keySelector, comparer) {
    return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generateAsync(source, keySelector, true, comparer);
}
exports.orderByAsync = orderByAsync;
function orderByDescending(source, keySelector, comparer) {
    return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generate(source, keySelector, false, comparer);
}
exports.orderByDescending = orderByDescending;
function orderByDescendingAsync(source, keySelector, comparer) {
    return OrderedAsyncEnumerable_1.OrderedAsyncEnumerable.generateAsync(source, keySelector, false, comparer);
}
exports.orderByDescendingAsync = orderByDescendingAsync;
/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
function last(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        if (predicate) {
            return AsyncEnumerablePrivate.last_2(source, predicate);
        }
        else {
            return AsyncEnumerablePrivate.last_1(source);
        }
    });
}
exports.last = last;
/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
function lastAsync(source, predicate) {
    var source_21, source_21_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_31, _a;
        let last = null;
        try {
            for (source_21 = __asyncValues(source); source_21_1 = yield source_21.next(), !source_21_1.done;) {
                const value = source_21_1.value;
                if ((yield predicate(value)) === true) {
                    last = value;
                }
            }
        }
        catch (e_31_1) { e_31 = { error: e_31_1 }; }
        finally {
            try {
                if (source_21_1 && !source_21_1.done && (_a = source_21.return)) yield _a.call(source_21);
            }
            finally { if (e_31) throw e_31.error; }
        }
        if (!last) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        }
        return last;
    });
}
exports.lastAsync = lastAsync;
function lastOrDefault(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        if (predicate) {
            return AsyncEnumerablePrivate.lastOrDefault_2(source, predicate);
        }
        else {
            return AsyncEnumerablePrivate.lastOrDefault_1(source);
        }
    });
}
exports.lastOrDefault = lastOrDefault;
function lastOrDefaultAsync(source, predicate) {
    var source_22, source_22_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_32, _a;
        let last = null;
        try {
            for (source_22 = __asyncValues(source); source_22_1 = yield source_22.next(), !source_22_1.done;) {
                const value = source_22_1.value;
                if ((yield predicate(value)) === true) {
                    last = value;
                }
            }
        }
        catch (e_32_1) { e_32 = { error: e_32_1 }; }
        finally {
            try {
                if (source_22_1 && !source_22_1.done && (_a = source_22.return)) yield _a.call(source_22);
            }
            finally { if (e_32) throw e_32.error; }
        }
        return last;
    });
}
exports.lastOrDefaultAsync = lastOrDefaultAsync;
function max(source, selector) {
    if (selector) {
        return AsyncEnumerablePrivate.max_2(source, selector);
    }
    else {
        return AsyncEnumerablePrivate.max_1(source);
    }
}
exports.max = max;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
function maxAsync(source, selector) {
    var source_23, source_23_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_33, _a;
        let max = null;
        try {
            for (source_23 = __asyncValues(source); source_23_1 = yield source_23.next(), !source_23_1.done;) {
                const item = source_23_1.value;
                max = Math.max(max || Number.NEGATIVE_INFINITY, yield selector(item));
            }
        }
        catch (e_33_1) { e_33 = { error: e_33_1 }; }
        finally {
            try {
                if (source_23_1 && !source_23_1.done && (_a = source_23.return)) yield _a.call(source_23);
            }
            finally { if (e_33) throw e_33.error; }
        }
        if (max === null) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        else {
            return max;
        }
    });
}
exports.maxAsync = maxAsync;
function min(source, selector) {
    if (selector) {
        return AsyncEnumerablePrivate.min_2(source, selector);
    }
    else {
        return AsyncEnumerablePrivate.min_1(source);
    }
}
exports.min = min;
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
function minAsync(source, selector) {
    var source_24, source_24_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_34, _a;
        let min = null;
        try {
            for (source_24 = __asyncValues(source); source_24_1 = yield source_24.next(), !source_24_1.done;) {
                const item = source_24_1.value;
                min = Math.min(min || Number.POSITIVE_INFINITY, yield selector(item));
            }
        }
        catch (e_34_1) { e_34 = { error: e_34_1 }; }
        finally {
            try {
                if (source_24_1 && !source_24_1.done && (_a = source_24.return)) yield _a.call(source_24);
            }
            finally { if (e_34) throw e_34.error; }
        }
        if (min === null) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        else {
            return min;
        }
    });
}
exports.minAsync = minAsync;
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
function range(start, count) {
    if (start < 0) {
        throw new shared_1.ArgumentOutOfRangeException(`start`);
    }
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_15() {
            const max = start + count;
            for (let i = start; i < max; i++) {
                yield yield __await(i);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.range = range;
function repeat(element, count, delay) {
    if (count < 0) {
        throw new shared_1.ArgumentOutOfRangeException(`count`);
    }
    if (delay) {
        return AsyncEnumerablePrivate.repeat_2(element, count, delay);
    }
    else {
        return AsyncEnumerablePrivate.repeat_1(element, count);
    }
}
exports.repeat = repeat;
function reverse(source) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_16() {
            var e_35, _a;
            const values = [];
            try {
                for (var source_25 = __asyncValues(source), source_25_1; source_25_1 = yield __await(source_25.next()), !source_25_1.done;) {
                    const value = source_25_1.value;
                    values.push(value);
                }
            }
            catch (e_35_1) { e_35 = { error: e_35_1 }; }
            finally {
                try {
                    if (source_25_1 && !source_25_1.done && (_a = source_25.return)) yield __await(_a.call(source_25));
                }
                finally { if (e_35) throw e_35.error; }
            }
            for (let i = values.length - 1; i >= 0; i--) {
                yield yield __await(values[i]);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.reverse = reverse;
function sequenceEquals(first, second, comparer = shared_1.StrictEqualityComparer) {
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
exports.sequenceEquals = sequenceEquals;
function sequenceEqualsAsync(first, second, comparer) {
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
exports.sequenceEqualsAsync = sequenceEqualsAsync;
function sum(source, selector) {
    if (selector) {
        return AsyncEnumerablePrivate.sum_2(source, selector);
    }
    else {
        return AsyncEnumerablePrivate.sum_1(source);
    }
}
exports.sum = sum;
function sumAsync(source, selector) {
    var source_26, source_26_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_36, _a;
        let sum = 0;
        try {
            for (source_26 = __asyncValues(source); source_26_1 = yield source_26.next(), !source_26_1.done;) {
                const value = source_26_1.value;
                sum += yield selector(value);
            }
        }
        catch (e_36_1) { e_36 = { error: e_36_1 }; }
        finally {
            try {
                if (source_26_1 && !source_26_1.done && (_a = source_26.return)) yield _a.call(source_26);
            }
            finally { if (e_36) throw e_36.error; }
        }
        return sum;
    });
}
exports.sumAsync = sumAsync;
function take(source, amount) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_17() {
            var e_37, _a;
            // negative amounts should yield empty
            let amountLeft = amount > 0 ? amount : 0;
            try {
                for (var source_27 = __asyncValues(source), source_27_1; source_27_1 = yield __await(source_27.next()), !source_27_1.done;) {
                    const item = source_27_1.value;
                    if (amountLeft-- === 0) {
                        break;
                    }
                    else {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_37_1) { e_37 = { error: e_37_1 }; }
            finally {
                try {
                    if (source_27_1 && !source_27_1.done && (_a = source_27.return)) yield __await(_a.call(source_27));
                }
                finally { if (e_37) throw e_37.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.take = take;
function takeWhile(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.takeWhile_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.takeWhile_2(source, predicate);
    }
}
exports.takeWhile = takeWhile;
function takeWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.takeWhileAsync_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.takeWhileAsync_2(source, predicate);
    }
}
exports.takeWhileAsync = takeWhileAsync;
function toArray(source) {
    var source_28, source_28_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_38, _a;
        const array = [];
        try {
            for (source_28 = __asyncValues(source); source_28_1 = yield source_28.next(), !source_28_1.done;) {
                const item = source_28_1.value;
                array.push(item);
            }
        }
        catch (e_38_1) { e_38 = { error: e_38_1 }; }
        finally {
            try {
                if (source_28_1 && !source_28_1.done && (_a = source_28.return)) yield _a.call(source_28);
            }
            finally { if (e_38) throw e_38.error; }
        }
        return array;
    });
}
exports.toArray = toArray;
function toMap(source, selector) {
    var source_29, source_29_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_39, _a;
        const map = new Map();
        try {
            for (source_29 = __asyncValues(source); source_29_1 = yield source_29.next(), !source_29_1.done;) {
                const value = source_29_1.value;
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
        catch (e_39_1) { e_39 = { error: e_39_1 }; }
        finally {
            try {
                if (source_29_1 && !source_29_1.done && (_a = source_29.return)) yield _a.call(source_29);
            }
            finally { if (e_39) throw e_39.error; }
        }
        return map;
    });
}
exports.toMap = toMap;
function toMapAsync(source, selector) {
    var source_30, source_30_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_40, _a;
        const map = new Map();
        try {
            for (source_30 = __asyncValues(source); source_30_1 = yield source_30.next(), !source_30_1.done;) {
                const value = source_30_1.value;
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
        catch (e_40_1) { e_40 = { error: e_40_1 }; }
        finally {
            try {
                if (source_30_1 && !source_30_1.done && (_a = source_30.return)) yield _a.call(source_30);
            }
            finally { if (e_40) throw e_40.error; }
        }
        return map;
    });
}
exports.toMapAsync = toMapAsync;
function toObject(source, selector) {
    var source_31, source_31_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_41, _a;
        const map = {};
        try {
            for (source_31 = __asyncValues(source); source_31_1 = yield source_31.next(), !source_31_1.done;) {
                const value = source_31_1.value;
                map[selector(value)] = value;
            }
        }
        catch (e_41_1) { e_41 = { error: e_41_1 }; }
        finally {
            try {
                if (source_31_1 && !source_31_1.done && (_a = source_31.return)) yield _a.call(source_31);
            }
            finally { if (e_41) throw e_41.error; }
        }
        return map;
    });
}
exports.toObject = toObject;
function toObjectAsync(source, selector) {
    var source_32, source_32_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_42, _a;
        const map = {};
        try {
            for (source_32 = __asyncValues(source); source_32_1 = yield source_32.next(), !source_32_1.done;) {
                const value = source_32_1.value;
                map[yield selector(value)] = value;
            }
        }
        catch (e_42_1) { e_42 = { error: e_42_1 }; }
        finally {
            try {
                if (source_32_1 && !source_32_1.done && (_a = source_32.return)) yield _a.call(source_32);
            }
            finally { if (e_42) throw e_42.error; }
        }
        return map;
    });
}
exports.toObjectAsync = toObjectAsync;
function toSet(source) {
    var source_33, source_33_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_43, _a;
        const set = new Set();
        try {
            for (source_33 = __asyncValues(source); source_33_1 = yield source_33.next(), !source_33_1.done;) {
                const item = source_33_1.value;
                set.add(item);
            }
        }
        catch (e_43_1) { e_43 = { error: e_43_1 }; }
        finally {
            try {
                if (source_33_1 && !source_33_1.done && (_a = source_33.return)) yield _a.call(source_33);
            }
            finally { if (e_43) throw e_43.error; }
        }
        return set;
    });
}
exports.toSet = toSet;
function union(first, second, comparer) {
    if (comparer) {
        return AsyncEnumerablePrivate.union_2(first, second, comparer);
    }
    else {
        return AsyncEnumerablePrivate.union_1(first, second);
    }
}
exports.union = union;
function unionAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_18() {
            var e_44, _a;
            const result = [];
            for (const source of [first, second]) {
                try {
                    for (var source_34 = __asyncValues(source), source_34_1; source_34_1 = yield __await(source_34.next()), !source_34_1.done;) {
                        const value = source_34_1.value;
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
                catch (e_44_1) { e_44 = { error: e_44_1 }; }
                finally {
                    try {
                        if (source_34_1 && !source_34_1.done && (_a = source_34.return)) yield __await(_a.call(source_34));
                    }
                    finally { if (e_44) throw e_44.error; }
                }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.unionAsync = unionAsync;
function where(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.where_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.where_2(source, predicate);
    }
}
exports.where = where;
function whereAsync(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.whereAsync_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.whereAsync_2(source, predicate);
    }
}
exports.whereAsync = whereAsync;
function zip(source, second, resultSelector) {
    if (resultSelector) {
        return AsyncEnumerablePrivate.zip_2(source, second, resultSelector);
    }
    else {
        return AsyncEnumerablePrivate.zip_1(source, second);
    }
}
exports.zip = zip;
function zipAsync(source, second, resultSelector) {
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
exports.zipAsync = zipAsync;
