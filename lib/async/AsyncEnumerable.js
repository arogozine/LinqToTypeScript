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
var allAsync_1 = require("./_private/allAsync");
exports.allAsync = allAsync_1.allAsync;
var any_1 = require("./_private/any");
exports.any = any_1.any;
var anyAsync_1 = require("./_private/anyAsync");
exports.anyAsync = anyAsync_1.anyAsync;
var average_1 = require("./_private/average");
exports.average = average_1.average;
var averageAsync_1 = require("./_private/averageAsync");
exports.averageAsync = averageAsync_1.averageAsync;
var contains_1 = require("./_private/contains");
exports.contains = contains_1.contains;
var containsAsync_1 = require("./_private/containsAsync");
exports.containsAsync = containsAsync_1.containsAsync;
var count_1 = require("./_private/count");
exports.count = count_1.count;
var countAsync_1 = require("./_private/countAsync");
exports.countAsync = countAsync_1.countAsync;
var elementAt_1 = require("./_private/elementAt");
exports.elementAt = elementAt_1.elementAt;
/**
 * Convers an async iterable to a Parallel Enumerable.
 * @param source AsyncIterable<T> to conver to IParallelEnumerable<T>
 * @returns Parallel Enumerable of source
 */
function asParallel(source) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const data = [];
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield source_1.next(), !source_1_1.done;) {
                    const value = source_1_1.value;
                    data.push(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield _a.call(source_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return data;
        });
    }
    return parallel_1.from(0 /* PromiseToArray */, generator);
}
exports.asParallel = asParallel;
/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IAsyncEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
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
function distinct(source, comparer = shared_1.StrictEqualityComparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            var e_2, _a;
            const distinctElements = [];
            try {
                for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield __await(source_2.next()), !source_2_1.done;) {
                    const item = source_2_1.value;
                    const foundItem = distinctElements.find((x) => comparer(x, item));
                    if (!foundItem) {
                        distinctElements.push(item);
                        yield yield __await(item);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield __await(_a.call(source_2));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.distinct = distinct;
function distinctAsync(source, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            var e_3, _a;
            const distinctElements = [];
            try {
                outerLoop: for (var source_3 = __asyncValues(source), source_3_1; source_3_1 = yield __await(source_3.next()), !source_3_1.done;) {
                    const item = source_3_1.value;
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
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (source_3_1 && !source_3_1.done && (_a = source_3.return)) yield __await(_a.call(source_3));
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.distinctAsync = distinctAsync;
var elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
exports.elementAtOrDefault = elementAtOrDefault_1.elementAtOrDefault;
function empty() {
    function iterable() {
        return __asyncGenerator(this, arguments, function* iterable_1() {
            var e_4, _a;
            try {
                for (var _b = __asyncValues([]), _c; _c = yield __await(_b.next()), !_c.done;) {
                    const _ = _c.value;
                    yield yield __await(_);
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
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterable);
}
exports.empty = empty;
function enumerateObject(source) {
    function iterable() {
        return __asyncGenerator(this, arguments, function* iterable_2() {
            /* tslint:disable */
            for (const key in source) {
                yield yield __await([key, source[key]]);
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
            var e_5, _a, e_6, _b;
            // TODO: async eq of [...second] ?
            const secondArray = [];
            try {
                for (var second_1 = __asyncValues(second), second_1_1; second_1_1 = yield __await(second_1.next()), !second_1_1.done;) {
                    const x = second_1_1.value;
                    secondArray.push(x);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (second_1_1 && !second_1_1.done && (_a = second_1.return)) yield __await(_a.call(second_1));
                }
                finally { if (e_5) throw e_5.error; }
            }
            try {
                for (var first_2 = __asyncValues(first), first_2_1; first_2_1 = yield __await(first_2.next()), !first_2_1.done;) {
                    const firstItem = first_2_1.value;
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
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (first_2_1 && !first_2_1.done && (_b = first_2.return)) yield __await(_b.call(first_2));
                }
                finally { if (e_6) throw e_6.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.except = except;
function exceptAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_5() {
            var e_7, _a, e_8, _b;
            // TODO: async eq of [...second] ?
            const secondArray = [];
            try {
                for (var second_2 = __asyncValues(second), second_2_1; second_2_1 = yield __await(second_2.next()), !second_2_1.done;) {
                    const x = second_2_1.value;
                    secondArray.push(x);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (second_2_1 && !second_2_1.done && (_a = second_2.return)) yield __await(_a.call(second_2));
                }
                finally { if (e_7) throw e_7.error; }
            }
            try {
                for (var first_3 = __asyncValues(first), first_3_1; first_3_1 = yield __await(first_3.next()), !first_3_1.done;) {
                    const firstItem = first_3_1.value;
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
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (first_3_1 && !first_3_1.done && (_b = first_3.return)) yield __await(_b.call(first_3));
                }
                finally { if (e_8) throw e_8.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.exceptAsync = exceptAsync;
var first_1 = require("./_private/first");
exports.first = first_1.first;
var firstAsync_1 = require("./_private/firstAsync");
exports.firstAsync = firstAsync_1.firstAsync;
var firstOrDefault_1 = require("./_private/firstOrDefault");
exports.firstOrDefault = firstOrDefault_1.firstOrDefault;
var firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
exports.firstOrDefaultAsync = firstOrDefaultAsync_1.firstOrDefaultAsync;
function flatten(source, shallow) {
    function iterator(sourceInner) {
        return __asyncGenerator(this, arguments, function* iterator_6() {
            var e_9, _a, e_10, _b;
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
                        catch (e_10_1) { e_10 = { error: e_10_1 }; }
                        finally {
                            try {
                                if (items_1_1 && !items_1_1.done && (_b = items_1.return)) yield __await(_b.call(items_1));
                            }
                            finally { if (e_10) throw e_10.error; }
                        }
                    }
                    else {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (sourceInner_1_1 && !sourceInner_1_1.done && (_a = sourceInner_1.return)) yield __await(_a.call(sourceInner_1));
                }
                finally { if (e_9) throw e_9.error; }
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
                var e_11, _a;
                try {
                    for (var promisesOrIterable_1 = __asyncValues(promisesOrIterable), promisesOrIterable_1_1; promisesOrIterable_1_1 = yield __await(promisesOrIterable_1.next()), !promisesOrIterable_1_1.done;) {
                        const value = promisesOrIterable_1_1.value;
                        yield yield __await(value);
                    }
                }
                catch (e_11_1) { e_11 = { error: e_11_1 }; }
                finally {
                    try {
                        if (promisesOrIterable_1_1 && !promisesOrIterable_1_1.done && (_a = promisesOrIterable_1.return)) yield __await(_a.call(promisesOrIterable_1));
                    }
                    finally { if (e_11) throw e_11.error; }
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
            var e_12, _a;
            try {
                for (var source_4 = __asyncValues(source), source_4_1; source_4_1 = yield __await(source_4.next()), !source_4_1.done;) {
                    const value = source_4_1.value;
                    action(value);
                    yield yield __await(value);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (source_4_1 && !source_4_1.done && (_a = source_4.return)) yield __await(_a.call(source_4));
                }
                finally { if (e_12) throw e_12.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.each = each;
/**
 * Performs a specified action on each element of the AsyncIterable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IAsyncEnumerable<T> that executes the action lazily as you iterate.
 */
function eachAsync(source, action) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_8() {
            var e_13, _a;
            try {
                for (var source_5 = __asyncValues(source), source_5_1; source_5_1 = yield __await(source_5.next()), !source_5_1.done;) {
                    const value = source_5_1.value;
                    yield __await(action(value));
                    yield yield __await(value);
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (source_5_1 && !source_5_1.done && (_a = source_5.return)) yield __await(_a.call(source_5));
                }
                finally { if (e_13) throw e_13.error; }
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
            var e_14, _a, e_15, _b;
            const innerArray = [];
            try {
                for (var inner_1 = __asyncValues(inner), inner_1_1; inner_1_1 = yield __await(inner_1.next()), !inner_1_1.done;) {
                    const i = inner_1_1.value;
                    innerArray.push(i);
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (inner_1_1 && !inner_1_1.done && (_a = inner_1.return)) yield __await(_a.call(inner_1));
                }
                finally { if (e_14) throw e_14.error; }
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
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (outer_1_1 && !outer_1_1.done && (_b = outer_1.return)) yield __await(_b.call(outer_1));
                }
                finally { if (e_15) throw e_15.error; }
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
/**
 * Projects each element of a sequence to an IAsyncEnumerable<T> and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IAsyncEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
function selectManyAsync(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_12() {
            var e_16, _a;
            try {
                for (var source_6 = __asyncValues(source), source_6_1; source_6_1 = yield __await(source_6.next()), !source_6_1.done;) {
                    const value = source_6_1.value;
                    const many = yield __await(selector(value));
                    for (const innerValue of many) {
                        yield yield __await(innerValue);
                    }
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (source_6_1 && !source_6_1.done && (_a = source_6.return)) yield __await(_a.call(source_6));
                }
                finally { if (e_16) throw e_16.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.selectManyAsync = selectManyAsync;
var single_1 = require("./_private/single");
exports.single = single_1.single;
var singleAsync_1 = require("./_private/singleAsync");
exports.singleAsync = singleAsync_1.singleAsync;
var singleOrDefault_1 = require("./_private/singleOrDefault");
exports.singleOrDefault = singleOrDefault_1.singleOrDefault;
var singleOrDefaultAsync_1 = require("./_private/singleOrDefaultAsync");
exports.singleOrDefaultAsync = singleOrDefaultAsync_1.singleOrDefaultAsync;
/**
 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @param source An AsyncIterable<T> to return elements from.
 * @param count The number of elements to skip before returning the remaining elements.
 * @returns
 * An IAsyncEnumerable<T> that contains the elements that occur after the specified index in the input sequence.
 */
function skip(source, count) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_13() {
            var e_17, _a;
            let i = 0;
            try {
                for (var source_7 = __asyncValues(source), source_7_1; source_7_1 = yield __await(source_7.next()), !source_7_1.done;) {
                    const item = source_7_1.value;
                    if (i++ >= count) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (source_7_1 && !source_7_1.done && (_a = source_7.return)) yield __await(_a.call(source_7));
                }
                finally { if (e_17) throw e_17.error; }
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.skip = skip;
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting at the first element
 * in the linear series that does not pass the test specified by predicate.
 */
function skipWhile(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhile_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.skipWhile_2(source, predicate);
    }
}
exports.skipWhile = skipWhile;
/**
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index is used in the logic of the predicate function.
 * @param source An AsyncIterable<T> to return elements from.
 * @param predicate A function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IAsyncEnumerable<T> that contains the elements from the input sequence starting
 * at the first element in the linear series that does not pass the test specified by predicate.
 */
function skipWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return AsyncEnumerablePrivate.skipWhileAsync_1(source, predicate);
    }
    else {
        return AsyncEnumerablePrivate.skipWhileAsync_2(source, predicate);
    }
}
exports.skipWhileAsync = skipWhileAsync;
/**
 * Applies a type filter to a source iteration
 * @param source Async Iteration to Filtery by Type
 * @param type Either value for typeof or a consturctor function
 * @returns Values that match the type string or are instance of type
 */
function ofType(source, type) {
    const typeCheck = typeof type === "string" ?
        ((x) => typeof x === type) :
        ((x) => x instanceof type);
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_14() {
            var e_18, _a;
            try {
                for (var source_8 = __asyncValues(source), source_8_1; source_8_1 = yield __await(source_8.next()), !source_8_1.done;) {
                    const item = source_8_1.value;
                    if (typeCheck(item)) {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (source_8_1 && !source_8_1.done && (_a = source_8.return)) yield __await(_a.call(source_8));
                }
                finally { if (e_18) throw e_18.error; }
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
var last_1 = require("./_private/last");
exports.last = last_1.last;
var lastAsync_1 = require("./_private/lastAsync");
exports.lastAsync = lastAsync_1.lastAsync;
var lastOrDefault_1 = require("./_private/lastOrDefault");
exports.lastOrDefault = lastOrDefault_1.lastOrDefault;
var lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
exports.lastOrDefaultAsync = lastOrDefaultAsync_1.lastOrDefaultAsync;
var max_1 = require("./_private/max");
exports.max = max_1.max;
var maxAsync_1 = require("./_private/maxAsync");
exports.maxAsync = maxAsync_1.maxAsync;
var min_1 = require("./_private/min");
exports.min = min_1.min;
var minAsync_1 = require("./_private/minAsync");
exports.minAsync = minAsync_1.minAsync;
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
/**
 * Generates a sequence that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated sequence.
 * @returns An IAsyncEnumerable<T> that contains a repeated value.
 */
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
            var e_19, _a;
            const values = [];
            try {
                for (var source_9 = __asyncValues(source), source_9_1; source_9_1 = yield __await(source_9.next()), !source_9_1.done;) {
                    const value = source_9_1.value;
                    values.push(value);
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (source_9_1 && !source_9_1.done && (_a = source_9.return)) yield __await(_a.call(source_9));
                }
                finally { if (e_19) throw e_19.error; }
            }
            for (let i = values.length - 1; i >= 0; i--) {
                yield yield __await(values[i]);
            }
        });
    }
    return new BasicAsyncEnumerable_1.BasicAsyncEnumerable(iterator);
}
exports.reverse = reverse;
var sequenceEquals_1 = require("./_private/sequenceEquals");
exports.sequenceEquals = sequenceEquals_1.sequenceEquals;
var sequenceEqualsAsync_1 = require("./_private/sequenceEqualsAsync");
exports.sequenceEqualsAsync = sequenceEqualsAsync_1.sequenceEqualsAsync;
var sum_1 = require("./_private/sum");
exports.sum = sum_1.sum;
var sumAsync_1 = require("./_private/sumAsync");
exports.sumAsync = sumAsync_1.sumAsync;
function take(source, amount) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_17() {
            var e_20, _a;
            // negative amounts should yield empty
            let amountLeft = amount > 0 ? amount : 0;
            try {
                for (var source_10 = __asyncValues(source), source_10_1; source_10_1 = yield __await(source_10.next()), !source_10_1.done;) {
                    const item = source_10_1.value;
                    if (amountLeft-- === 0) {
                        break;
                    }
                    else {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (source_10_1 && !source_10_1.done && (_a = source_10.return)) yield __await(_a.call(source_10));
                }
                finally { if (e_20) throw e_20.error; }
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
var toArray_1 = require("./_private/toArray");
exports.toArray = toArray_1.toArray;
var toMap_1 = require("./_private/toMap");
exports.toMap = toMap_1.toMap;
var toMapAsync_1 = require("./_private/toMapAsync");
exports.toMapAsync = toMapAsync_1.toMapAsync;
var toObject_1 = require("./_private/toObject");
exports.toObject = toObject_1.toObject;
var toObjectAsync_1 = require("./_private/toObjectAsync");
exports.toObjectAsync = toObjectAsync_1.toObjectAsync;
var toSet_1 = require("./_private/toSet");
exports.toSet = toSet_1.toSet;
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
            var e_21, _a;
            const result = [];
            for (const source of [first, second]) {
                try {
                    for (var source_11 = __asyncValues(source), source_11_1; source_11_1 = yield __await(source_11.next()), !source_11_1.done;) {
                        const value = source_11_1.value;
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
                catch (e_21_1) { e_21 = { error: e_21_1 }; }
                finally {
                    try {
                        if (source_11_1 && !source_11_1.done && (_a = source_11.return)) yield __await(_a.call(source_11));
                    }
                    finally { if (e_21) throw e_21.error; }
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
