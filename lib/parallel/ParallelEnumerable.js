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
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../async/async");
const shared_1 = require("../shared/shared");
const _nextIteration_1 = require("./_private/_nextIteration");
const _nextIterationAsync_1 = require("./_private/_nextIterationAsync");
const toArray_1 = require("./_private/toArray");
exports.toArray = toArray_1.toArray;
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
const OrderedParallelEnumerable_1 = require("./OrderedParallelEnumerable");
const ParallelEnumerablePrivate = require("./ParallelEnumerablePrivate");
/**
 * Contains static methods to work with Parallel Async
 */
var aggregate_1 = require("./_private/aggregate");
exports.aggregate = aggregate_1.aggregate;
var all_1 = require("./_private/all");
exports.all = all_1.all;
var allAsync_1 = require("./_private//allAsync");
exports.allAsync = allAsync_1.allAsync;
function empty() {
    const dataFunc = {
        generator: () => __awaiter(this, void 0, void 0, function* () { return []; }),
        type: 0 /* PromiseToArray */,
    };
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc);
}
exports.empty = empty;
var any_1 = require("./_private/any");
exports.any = any_1.any;
var anyAsync_1 = require("./_private/anyAsync");
exports.anyAsync = anyAsync_1.anyAsync;
function asAsync(source) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_1() {
            var e_1, _a;
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                    const value = source_1_1.value;
                    yield yield __await(value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield __await(_a.call(source_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    return async_1.from(generator);
}
exports.asAsync = asAsync;
var average_1 = require("./_private/average");
exports.average = average_1.average;
var averageAsync_1 = require("./_private/averageAsync");
exports.averageAsync = averageAsync_1.averageAsync;
function concat(
// tslint:disable-next-line:no-shadowed-variable
first, second) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        // Wait for both enumerables
        const promiseResults = yield Promise.all([first.toArray(), second.toArray()]);
        // Concat
        const firstData = promiseResults[0];
        const secondData = promiseResults[1];
        const data = new Array(firstData.length + secondData.length);
        let i = 0;
        for (; i < firstData.length; i++) {
            data[i] = firstData[i];
        }
        for (let j = 0; j < secondData.length; j++, i++) {
            data[i] = secondData[j];
        }
        return data;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.concat = concat;
var contains_1 = require("./_private/contains");
exports.contains = contains_1.contains;
var containsAsync_1 = require("./_private/containsAsync");
exports.containsAsync = containsAsync_1.containsAsync;
var count_1 = require("./_private/count");
exports.count = count_1.count;
var countAsync_1 = require("./_private/countAsync");
exports.countAsync = countAsync_1.countAsync;
function distinct(source, comparer = shared_1.StrictEqualityComparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const distinctElements = [];
        for (const item of yield source.toArray()) {
            const foundItem = distinctElements.find((x) => comparer(x, item));
            if (!foundItem) {
                distinctElements.push(item);
            }
        }
        return distinctElements;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.distinct = distinct;
function distinctAsync(source, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const distinctElements = [];
        outerLoop: for (const item of yield source.toArray()) {
            for (const distinctElement of distinctElements) {
                const found = yield comparer(distinctElement, item);
                if (found) {
                    continue outerLoop;
                }
            }
            distinctElements.push(item);
        }
        return distinctElements;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.distinctAsync = distinctAsync;
function each(source, action) {
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, (x) => {
        action(x);
        return x;
    }));
}
exports.each = each;
function eachAsync(source, action) {
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIterationAsync_1.nextIterationAsync(source, (x) => __awaiter(this, void 0, void 0, function* () {
        yield action(x);
        return x;
    })));
}
exports.eachAsync = eachAsync;
var elementAt_1 = require("./_private/elementAt");
exports.elementAt = elementAt_1.elementAt;
var elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
exports.elementAtOrDefault = elementAtOrDefault_1.elementAtOrDefault;
function except(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer = shared_1.EqualityComparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield Promise.all([first.toArray(), second.toArray()]);
        const firstValues = values[0];
        const secondValues = values[1];
        const resultValues = [];
        for (const firstItem of firstValues) {
            let exists = false;
            for (let j = 0; j < secondValues.length; j++) {
                const secondItem = secondValues[j];
                if (comparer(firstItem, secondItem) === true) {
                    exists = true;
                    break;
                }
            }
            if (exists === false) {
                resultValues.push(firstItem);
            }
        }
        return resultValues;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.except = except;
function exceptAsync(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield Promise.all([first.toArray(), second.toArray()]);
        const firstValues = values[0];
        const secondValues = values[1];
        const resultValues = [];
        for (const firstItem of firstValues) {
            let exists = false;
            for (let j = 0; j < secondValues.length; j++) {
                const secondItem = secondValues[j];
                if ((yield comparer(firstItem, secondItem)) === true) {
                    exists = true;
                    break;
                }
            }
            if (exists === false) {
                resultValues.push(firstItem);
            }
        }
        return resultValues;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.exceptAsync = exceptAsync;
var first_1 = require("./_private/first");
exports.first = first_1.first;
function firstAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield toArray_1.toArray(source);
        for (const value of data) {
            if ((yield predicate(value)) === true) {
                return value;
            }
        }
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    });
}
exports.firstAsync = firstAsync;
var firstOrDefault_1 = require("./_private/firstOrDefault");
exports.firstOrDefault = firstOrDefault_1.firstOrDefault;
var firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
exports.firstOrDefaultAsync = firstOrDefaultAsync_1.firstOrDefaultAsync;
function flatten(source, shallow) {
    function iterator(sourceInner) {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            var e_2, _a, e_3, _b;
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
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (items_1_1 && !items_1_1.done && (_b = items_1.return)) yield __await(_b.call(items_1));
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                    else {
                        yield yield __await(item);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (sourceInner_1_1 && !sourceInner_1_1.done && (_a = sourceInner_1.return)) yield __await(_a.call(sourceInner_1));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        var e_4, _a;
        const results = new Array();
        try {
            for (var _b = __asyncValues(iterator(source)), _c; _c = yield _b.next(), !_c.done;) {
                const x = _c.value;
                results.push(x);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.flatten = flatten;
function from(type, generator) {
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type,
    });
}
exports.from = from;
function groupBy(source, keySelector, comparer) {
    if (comparer) {
        return ParallelEnumerablePrivate.groupBy_0(source, keySelector, comparer);
    }
    else {
        return ParallelEnumerablePrivate.groupBy_0_Simple(source, keySelector);
    }
}
exports.groupBy = groupBy;
function groupByAsync(source, keySelector, comparer) {
    if (comparer) {
        return ParallelEnumerablePrivate.groupByAsync_0(source, keySelector, comparer);
    }
    else {
        return ParallelEnumerablePrivate.groupByAsync_0_Simple(source, keySelector);
    }
}
exports.groupByAsync = groupByAsync;
function groupByWithSel(source, keySelector, elementSelector, comparer) {
    if (comparer) {
        return ParallelEnumerablePrivate.groupBy_1(source, keySelector, elementSelector, comparer);
    }
    else {
        return ParallelEnumerablePrivate.groupBy_1_Simple(source, keySelector, elementSelector);
    }
}
exports.groupByWithSel = groupByWithSel;
function join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const innerOuter = yield Promise.all([inner.toArray(), outer.toArray()]);
        const innerArray = innerOuter[0];
        const outerArray = innerOuter[1];
        const results = new Array();
        for (const o of outerArray) {
            const outerKey = outerKeySelector(o);
            for (const i of innerArray) {
                const innerKey = innerKeySelector(i);
                if (comparer(outerKey, innerKey) === true) {
                    results.push(resultSelector(o, i));
                }
            }
        }
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.join = join;
function intersect(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer = shared_1.StrictEqualityComparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const firstResults = yield first.distinct(comparer).toArray();
        if (firstResults.length === 0) {
            return [];
        }
        const secondResults = yield second.toArray();
        const results = new Array();
        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i];
            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j];
                if (comparer(firstValue, secondValue) === true) {
                    results.push(firstValue);
                    break;
                }
            }
        }
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.intersect = intersect;
function intersectAsync(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const firstResults = yield first.distinctAsync(comparer).toArray();
        if (firstResults.length === 0) {
            return [];
        }
        const secondResults = yield second.toArray();
        const results = new Array();
        for (let i = 0; i < firstResults.length; i++) {
            const firstValue = firstResults[i];
            for (let j = 0; j < secondResults.length; j++) {
                const secondValue = secondResults[j];
                if ((yield comparer(firstValue, secondValue)) === true) {
                    results.push(firstValue);
                    break;
                }
            }
        }
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.intersectAsync = intersectAsync;
function min(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let minInfo;
        if (selector) {
            const dataFunc = _nextIteration_1.nextIteration(source, selector);
            minInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc)
                .toArray();
        }
        else {
            minInfo = yield source.toArray();
        }
        if (minInfo.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return Math.min.apply(null, minInfo);
    });
}
exports.min = min;
var last_1 = require("./_private/last");
exports.last = last_1.last;
var lastAsync_1 = require("./_private/lastAsync");
exports.lastAsync = lastAsync_1.lastAsync;
var lastOrDefault_1 = require("./_private/lastOrDefault");
exports.lastOrDefault = lastOrDefault_1.lastOrDefault;
var lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
exports.lastOrDefaultAsync = lastOrDefaultAsync_1.lastOrDefaultAsync;
function max(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let maxInfo;
        if (selector) {
            const dataFunc = _nextIteration_1.nextIteration(source, selector);
            maxInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc).toArray();
        }
        else {
            maxInfo = yield source.toArray();
        }
        if (maxInfo.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return Math.max.apply(null, maxInfo);
    });
}
exports.max = max;
function maxAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = _nextIterationAsync_1.nextIterationAsync(source, selector);
        const maxInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc).toArray();
        if (maxInfo.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return Math.max.apply(null, maxInfo);
    });
}
exports.maxAsync = maxAsync;
function minAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFunc = _nextIterationAsync_1.nextIterationAsync(source, selector);
        const maxInfo = yield new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFunc).toArray();
        if (maxInfo.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return Math.min.apply(null, maxInfo);
    });
}
exports.minAsync = minAsync;
function select(source, key) {
    if (typeof key === "string") {
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, (x) => x[key]));
    }
    else {
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, key));
    }
}
exports.select = select;
function selectAsync(source, keyOrSelector) {
    let selector;
    if (typeof keyOrSelector === "string") {
        selector = (x) => (x[keyOrSelector]);
    }
    else {
        selector = keyOrSelector;
    }
    const generator = _nextIterationAsync_1.nextIterationAsync(source, selector);
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(generator);
}
exports.selectAsync = selectAsync;
function selectMany(source, selector) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        let values;
        if (typeof selector === "string") {
            values = yield _nextIteration_1.nextIteration(source, (x) => x[selector]);
        }
        else {
            values = yield _nextIteration_1.nextIteration(source, selector);
        }
        const valuesArray = [];
        switch (values.type) {
            case 0 /* PromiseToArray */:
                {
                    for (const outer of yield values.generator()) {
                        for (const y of outer) {
                            valuesArray.push(y);
                        }
                    }
                    break;
                }
            case 1 /* ArrayOfPromises */:
                {
                    for (const outer of values.generator()) {
                        for (const y of yield outer) {
                            valuesArray.push(y);
                        }
                    }
                    break;
                }
            case 2 /* PromiseOfPromises */:
                {
                    for (const outer of yield values.generator()) {
                        for (const y of yield outer) {
                            valuesArray.push(y);
                        }
                    }
                    break;
                }
        }
        return valuesArray;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.selectMany = selectMany;
function selectManyAsync(source, selector) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield _nextIterationAsync_1.nextIterationAsync(source, selector);
        const valuesArray = [];
        switch (values.type) {
            case 0 /* PromiseToArray */:
                {
                    for (const outer of yield values.generator()) {
                        for (const y of outer) {
                            valuesArray.push(y);
                        }
                    }
                    break;
                }
            case 1 /* ArrayOfPromises */:
                {
                    for (const outer of values.generator()) {
                        for (const y of yield outer) {
                            valuesArray.push(y);
                        }
                    }
                    break;
                }
            case 2 /* PromiseOfPromises */:
                {
                    for (const outer of yield values.generator()) {
                        for (const y of yield outer) {
                            valuesArray.push(y);
                        }
                    }
                    break;
                }
        }
        return valuesArray;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.selectManyAsync = selectManyAsync;
function ofType(source, type) {
    const typeCheck = typeof type === "string" ?
        ((x) => typeof x === type) :
        ((x) => x instanceof type);
    const data = () => __awaiter(this, void 0, void 0, function* () { return (yield source.toArray()).filter(typeCheck); });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator: data,
        type: 0 /* PromiseToArray */,
    });
}
exports.ofType = ofType;
function orderBy(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generate(source, keySelector, true, comparer);
}
exports.orderBy = orderBy;
function orderByAsync(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generateAsync(source, keySelector, true, comparer);
}
exports.orderByAsync = orderByAsync;
function orderByDescending(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generate(source, keySelector, false, comparer);
}
exports.orderByDescending = orderByDescending;
function orderByDescendingAsync(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generateAsync(source, keySelector, false, comparer);
}
exports.orderByDescendingAsync = orderByDescendingAsync;
/**
 * Generates a sequence of integral numbers within a specified range.
 * @param start The value of the first integer in the sequence.
 * @param count The number of sequential integers to generate.
 * @throws {ArgumentOutOfRangeException} Start is Less than 0
 */
// tslint:disable-next-line:no-shadowed-variable
function range(start, count) {
    if (start < 0) {
        throw new shared_1.ArgumentOutOfRangeException(`start`);
    }
    function generator() {
        const items = [];
        const maxI = start + count;
        for (let i = start; i < maxI; i++) {
            items.push(Promise.resolve(i));
        }
        return items;
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 1 /* ArrayOfPromises */,
    });
}
exports.range = range;
function repeat(
// tslint:disable-next-line:no-shadowed-variable
element, count, delay) {
    if (count < 0) {
        throw new shared_1.ArgumentOutOfRangeException(`count`);
    }
    if (delay) {
        return ParallelEnumerablePrivate.repeat_2(element, count, delay);
    }
    else {
        return ParallelEnumerablePrivate.repeat_1(element, count);
    }
}
exports.repeat = repeat;
function reverse(source) {
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 1 /* ArrayOfPromises */: {
            const generator = () => {
                return dataFunc.generator().reverse();
            };
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            });
        }
        case 2 /* PromiseOfPromises */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield dataFunc.generator();
                return array.reverse();
            });
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            });
        }
        case 0 /* PromiseToArray */: {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const array = yield dataFunc.generator();
                return array.reverse();
            });
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator,
                type: dataFunc.type,
            });
        }
    }
}
exports.reverse = reverse;
function sequenceEquals(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer = shared_1.StrictEqualityComparer) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstArray = yield first.toArray();
        const secondArray = yield second.toArray();
        if (firstArray.length !== secondArray.length) {
            return false;
        }
        for (let i = 0; i < firstArray.length; i++) {
            const firstResult = firstArray[i];
            const secondResult = secondArray[i];
            if (comparer(firstResult, secondResult) === false) {
                return false;
            }
        }
        return true;
    });
}
exports.sequenceEquals = sequenceEquals;
function sequenceEqualsAsync(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstArray = yield first.toArray();
        const secondArray = yield second.toArray();
        if (firstArray.length !== secondArray.length) {
            return false;
        }
        for (let i = 0; i < firstArray.length; i++) {
            const firstResult = firstArray[i];
            const secondResult = secondArray[i];
            if ((yield comparer(firstResult, secondResult)) === false) {
                return false;
            }
        }
        return true;
    });
}
exports.sequenceEqualsAsync = sequenceEqualsAsync;
var single_1 = require("./_private/single");
exports.single = single_1.single;
var singleAsync_1 = require("./_private/singleAsync");
exports.singleAsync = singleAsync_1.singleAsync;
var singleOrDefault_1 = require("./_private/singleOrDefault");
exports.singleOrDefault = singleOrDefault_1.singleOrDefault;
var singleOrDefaultAsync_1 = require("./_private/singleOrDefaultAsync");
exports.singleOrDefaultAsync = singleOrDefaultAsync_1.singleOrDefaultAsync;
function skip(source, 
// tslint:disable-next-line:no-shadowed-variable
count) {
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 0 /* PromiseToArray */:
            {
                const generator = () => __awaiter(this, void 0, void 0, function* () { return (yield dataFunc.generator()).slice(count); });
                return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                    generator,
                    type: 0 /* PromiseToArray */,
                });
            }
        case 1 /* ArrayOfPromises */:
            {
                const generator = () => dataFunc.generator().slice(count);
                return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                    generator,
                    type: 1 /* ArrayOfPromises */,
                });
            }
        case 2 /* PromiseOfPromises */:
            {
                const generator = () => __awaiter(this, void 0, void 0, function* () {
                    const dataInner = yield dataFunc.generator();
                    return dataInner.slice(count);
                });
                const dataFuncNew = {
                    generator,
                    type: 2 /* PromiseOfPromises */,
                };
                return new BasicParallelEnumerable_1.BasicParallelEnumerable(dataFuncNew);
            }
    }
}
exports.skip = skip;
function skipWhile(source, predicate) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        let i = 0;
        for (; i < values.length; i++) {
            const value = values[i];
            if (predicate(value, i) === false) {
                break;
            }
        }
        const returnedValues = [];
        for (; i < values.length; i++) {
            returnedValues.push(values[i]);
        }
        return returnedValues;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.skipWhile = skipWhile;
function skipWhileAsync(source, predicate) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        let i = 0;
        for (; i < values.length; i++) {
            const value = values[i];
            if ((yield predicate(value, i)) === false) {
                break;
            }
        }
        const returnedValues = [];
        for (; i < values.length; i++) {
            returnedValues.push(values[i]);
        }
        return returnedValues;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.skipWhileAsync = skipWhileAsync;
var sum_1 = require("./_private/sum");
exports.sum = sum_1.sum;
var sumAsync_1 = require("./_private/sumAsync");
exports.sumAsync = sumAsync_1.sumAsync;
function take(source, amount) {
    const amountLeft = amount > 0 ? amount : 0;
    const dataFunc = source.dataFunc;
    switch (dataFunc.type) {
        case 1 /* ArrayOfPromises */:
            const generator1 = () => dataFunc.generator().splice(0, amountLeft);
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator: generator1,
                type: 1 /* ArrayOfPromises */,
            });
        case 2 /* PromiseOfPromises */:
            const generator2 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft));
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator: generator2,
                type: 2 /* PromiseOfPromises */,
            });
        case 0 /* PromiseToArray */:
        default:
            const generator3 = () => dataFunc.generator().then((x) => x.splice(0, amountLeft));
            return new BasicParallelEnumerable_1.BasicParallelEnumerable({
                generator: generator3,
                type: 0 /* PromiseToArray */,
            });
    }
}
exports.take = take;
function takeWhile(source, predicate) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        const results = new Array();
        if (predicate.length === 1) {
            for (const value of values) {
                if (predicate(value) === true) {
                    results.push(value);
                }
                else {
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                if (predicate(value, i) === true) {
                    results.push(value);
                }
                else {
                    break;
                }
            }
        }
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.takeWhile = takeWhile;
function takeWhileAsync(source, predicate) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        const results = new Array();
        if (predicate.length === 1) {
            const sPredicate = predicate;
            for (const value of values) {
                if ((yield sPredicate(value)) === true) {
                    results.push(value);
                }
                else {
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                if ((yield predicate(value, i)) === true) {
                    results.push(value);
                }
                else {
                    break;
                }
            }
        }
        return results;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.takeWhileAsync = takeWhileAsync;
function toMap(source, selector) {
    var source_2, source_2_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_5, _a;
        const map = new Map();
        try {
            for (source_2 = __asyncValues(source); source_2_1 = yield source_2.next(), !source_2_1.done;) {
                const value = source_2_1.value;
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
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield _a.call(source_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return map;
    });
}
exports.toMap = toMap;
function toMapAsync(source, selector) {
    var source_3, source_3_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_6, _a;
        const map = new Map();
        try {
            for (source_3 = __asyncValues(source); source_3_1 = yield source_3.next(), !source_3_1.done;) {
                const value = source_3_1.value;
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
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (source_3_1 && !source_3_1.done && (_a = source_3.return)) yield _a.call(source_3);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return map;
    });
}
exports.toMapAsync = toMapAsync;
function toObject(source, selector) {
    var source_4, source_4_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_7, _a;
        const map = {};
        try {
            for (source_4 = __asyncValues(source); source_4_1 = yield source_4.next(), !source_4_1.done;) {
                const value = source_4_1.value;
                map[selector(value)] = value;
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (source_4_1 && !source_4_1.done && (_a = source_4.return)) yield _a.call(source_4);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return map;
    });
}
exports.toObject = toObject;
function toSet(source) {
    var source_5, source_5_1;
    return __awaiter(this, void 0, void 0, function* () {
        var e_8, _a;
        const set = new Set();
        try {
            for (source_5 = __asyncValues(source); source_5_1 = yield source_5.next(), !source_5_1.done;) {
                const item = source_5_1.value;
                set.add(item);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (source_5_1 && !source_5_1.done && (_a = source_5.return)) yield _a.call(source_5);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return set;
    });
}
exports.toSet = toSet;
function union(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
    if (comparer) {
        return ParallelEnumerablePrivate.union_2(first, second, comparer);
    }
    else {
        return ParallelEnumerablePrivate.union_1(first, second);
    }
}
exports.union = union;
function unionAsync(
// tslint:disable-next-line:no-shadowed-variable
first, second, comparer) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const values = yield Promise.all([first.toArray(), second.toArray()]);
        for (const source of values) {
            for (const value of source) {
                let exists = false;
                for (const resultValue of result) {
                    if ((yield comparer(value, resultValue)) === true) {
                        exists = true;
                        break;
                    }
                }
                if (exists === false) {
                    result.push(value);
                }
            }
        }
        return result;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.unionAsync = unionAsync;
function where(source, predicate) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        return values.filter(predicate);
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.where = where;
function whereAsync(source, predicate) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        const values = yield source.toArray();
        const valuesAsync = values.map((x, i) => __awaiter(this, void 0, void 0, function* () {
            const keep = yield predicate(x, i);
            return {
                keep,
                x,
            };
        }));
        const filteredValues = [];
        for (const value of yield Promise.all(valuesAsync)) {
            if (value.keep) {
                filteredValues.push(value.x);
            }
        }
        return filteredValues;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.whereAsync = whereAsync;
function zip(source, second, resultSelector) {
    if (resultSelector) {
        return ParallelEnumerablePrivate.zip_2(source, second, resultSelector);
    }
    else {
        return ParallelEnumerablePrivate.zip_1(source, second);
    }
}
exports.zip = zip;
function zipAsync(source, second, resultSelector) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const [left, right] = yield Promise.all([source.toArray(), second.toArray()]);
            const maxLength = left.length > right.length ? left.length : right.length;
            const resultPromises = new Array(maxLength);
            for (let i = 0; i < maxLength; i++) {
                const a = left[i];
                const b = right[i];
                resultPromises[i] = resultSelector(a, b);
            }
            return Promise.all(resultPromises);
        });
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.zipAsync = zipAsync;
