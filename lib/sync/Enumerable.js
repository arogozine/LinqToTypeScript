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
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const parallel_1 = require("../parallel/parallel");
const shared_1 = require("../shared/shared");
// import { AsyncEnumerable } from "./../async/AsyncEnumerable"
const async_1 = require("./../async/async");
const BasicEnumerable_1 = require("./BasicEnumerable");
const Grouping_1 = require("./Grouping");
const OrderedEnumerable_1 = require("./OrderedEnumerable");
function aggregate(source, seedOrFunc, func, resultSelector) {
    if (resultSelector) {
        if (!func) {
            throw new ReferenceError(`TAccumulate function is undefined`);
        }
        return aggregate_3(source, seedOrFunc, func, resultSelector);
    }
    else if (func) {
        return aggregate_2(source, seedOrFunc, func);
    }
    else {
        return aggregate_1(source, seedOrFunc);
    }
}
exports.aggregate = aggregate;
/**
 * @throws {InvalidOperationException} No Elements
 */
function aggregate_1(source, func) {
    let aggregateValue;
    for (const value of source) {
        if (aggregateValue) {
            aggregateValue = func(aggregateValue, value);
        }
        else {
            aggregateValue = value;
        }
    }
    if (aggregateValue === undefined) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return aggregateValue;
}
function aggregate_2(source, seed, func) {
    let aggregateValue = seed;
    for (const value of source) {
        aggregateValue = func(aggregateValue, value);
    }
    return aggregateValue;
}
function aggregate_3(source, seed, func, resultSelector) {
    let aggregateValue = seed;
    for (const value of source) {
        aggregateValue = func(aggregateValue, value);
    }
    return resultSelector(aggregateValue);
}
function all(source, predicate) {
    for (const item of source) {
        if (predicate(item) === false) {
            return false;
        }
    }
    return true;
}
exports.all = all;
function allAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of source) {
            if ((yield predicate(item)) === false) {
                return false;
            }
        }
        return true;
    });
}
exports.allAsync = allAsync;
function any(source, predicate) {
    if (predicate) {
        return any_2(source, predicate);
    }
    else {
        return any_1(source);
    }
}
exports.any = any;
function any_1(source) {
    for (const _ of source) {
        return true;
    }
    return false;
}
function any_2(source, predicate) {
    for (const item of source) {
        if (predicate(item) === true) {
            return true;
        }
    }
    return false;
}
function anyAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of source) {
            if ((yield predicate(item)) === true) {
                return true;
            }
        }
        return false;
    });
}
exports.anyAsync = anyAsync;
/**
 * Converts the iterable to an @see {IAsyncEnumerable}
 */
function asAsync(source) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_1() {
            for (const value of source) {
                yield yield __await(value);
            }
        });
    }
    return async_1.from(generator);
}
exports.asAsync = asAsync;
/**
 * Converts an iterable to @see {IAsyncParallel}
 */
function asParallel(source) {
    function generator() {
        return __awaiter(this, void 0, void 0, function* () {
            const array = [];
            for (const value of source) {
                array.push(value);
            }
            return array;
        });
    }
    return parallel_1.ParallelEnumerable.from(0 /* PromiseToArray */, generator);
}
exports.asParallel = asParallel;
function average(source, selector) {
    if (selector) {
        return average_2(source, selector);
    }
    else {
        return average_1(source);
    }
}
exports.average = average;
function average_1(source) {
    let value;
    let count;
    for (const item of source) {
        value = (value || 0) + item;
        count = (count || 0) + 1;
    }
    if (value === undefined) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return value / count;
}
function average_2(source, func) {
    let value;
    let count;
    for (const item of source) {
        value = (value || 0) + func(item);
        count = (count || 0) + 1;
    }
    if (value === undefined) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return value / count;
}
/**
 * @throws {InvalidOperationException} No Elements
 */
function averageAsync(source, func) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        let count;
        for (const item of source) {
            value = (value || 0) + (yield func(item));
            count = (count || 0) + 1;
        }
        if (value === undefined) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return value / count;
    });
}
exports.averageAsync = averageAsync;
function concat(first, second) {
    function* iterator() {
        yield* first;
        yield* second;
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.concat = concat;
function contains(source, value, comparer = shared_1.StrictEqualityComparer) {
    for (const item of source) {
        if (comparer(value, item)) {
            return true;
        }
    }
    return false;
}
exports.contains = contains;
function containsAsync(source, value, comparer) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of source) {
            if (yield comparer(value, item)) {
                return true;
            }
        }
        return false;
    });
}
exports.containsAsync = containsAsync;
function count(source, predicate) {
    if (predicate) {
        return count_2(source, predicate);
    }
    else {
        return count_1(source);
    }
}
exports.count = count;
function count_1(source) {
    let count = 0;
    for (const _ of source) {
        count++;
    }
    return count;
}
function count_2(source, predicate) {
    let count = 0;
    for (const value of source) {
        if (predicate(value) === true) {
            count++;
        }
    }
    return count;
}
function countAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = 0;
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                count++;
            }
        }
        return count;
    });
}
exports.countAsync = countAsync;
function distinct(source, comparer = shared_1.StrictEqualityComparer) {
    function* iterator() {
        const distinctElements = [];
        for (const item of source) {
            const foundItem = distinctElements.find((x) => comparer(x, item));
            if (!foundItem) {
                distinctElements.push(item);
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.distinct = distinct;
function distinctAsync(source, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_1() {
            const distinctElements = [];
            outerLoop: for (const item of source) {
                for (const distinctElement of distinctElements) {
                    const found = yield __await(comparer(distinctElement, item));
                    if (found) {
                        continue outerLoop;
                    }
                }
                distinctElements.push(item);
                yield yield __await(item);
            }
        });
    }
    return async_1.from(iterator);
}
exports.distinctAsync = distinctAsync;
function each(source, action) {
    function* generator() {
        for (const value of source) {
            action(value);
            yield value;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generator);
}
exports.each = each;
function eachAsync(source, action) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_2() {
            for (const value of source) {
                yield __await(action(value));
                yield yield __await(value);
            }
        });
    }
    return async_1.from(generator);
}
exports.eachAsync = eachAsync;
/**
 * Returns Element at specified position
 * @throws {ArgumentOutOfRangeException} Index outside of iteration
 * @param source Iteration of Elements
 * @param index Index for Element
 */
function elementAt(source, index) {
    if (index < 0) {
        throw new shared_1.ArgumentOutOfRangeException("index");
    }
    let i = 0;
    for (const item of source) {
        if (index === i++) {
            return item;
        }
    }
    throw new shared_1.ArgumentOutOfRangeException("index");
}
exports.elementAt = elementAt;
function elementAtOrDefault(source, index) {
    let i = 0;
    for (const item of source) {
        if (index === i++) {
            return item;
        }
    }
    return null;
}
exports.elementAtOrDefault = elementAtOrDefault;
/**
 * Empty Enumerable
 */
function empty() {
    const iterator = function* () {
        for (const x of []) {
            yield x;
        }
    };
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.empty = empty;
function enumerateObject(source) {
    function* iterable() {
        // tslint:disable-next-line:forin
        for (const key in source) {
            yield {
                first: key,
                second: source[key],
            };
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterable);
}
exports.enumerateObject = enumerateObject;
function except(first, second, comparer = shared_1.EqualityComparer) {
    function* iterator() {
        const secondArray = [...second];
        for (const firstItem of first) {
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
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.except = except;
function exceptAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
            const secondArray = [...second];
            for (const firstItem of first) {
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
        });
    }
    return async_1.from(iterator);
}
exports.exceptAsync = exceptAsync;
function first(source, predicate) {
    if (predicate) {
        return first_2(source, predicate);
    }
    else {
        return first_1(source);
    }
}
exports.first = first;
function first_1(source) {
    const first = source[Symbol.iterator]().next();
    if (first.done === true) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return first.value;
}
function first_2(source, predicate) {
    for (const value of source) {
        if (predicate(value) === true) {
            return value;
        }
    }
    throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
}
/**
 * @throws {InvalidOperationException} No Matching Elements in Iteration
 * @param source Source Iteration
 * @param predicate Predicate to Select First Element
 */
function firstAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                return value;
            }
        }
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    });
}
exports.firstAsync = firstAsync;
function firstOrDefault(source, predicate) {
    if (predicate) {
        return firstOrDefault_2(source, predicate);
    }
    else {
        return firstOrDefault_1(source);
    }
}
exports.firstOrDefault = firstOrDefault;
function firstOrDefault_1(source) {
    const first = source[Symbol.iterator]().next();
    return first.value || null;
}
function firstOrDefault_2(source, predicate) {
    for (const value of source) {
        if (predicate(value) === true) {
            return value;
        }
    }
    return null;
}
function firstOrDefaultAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                return value;
            }
        }
        return null;
    });
}
exports.firstOrDefaultAsync = firstOrDefaultAsync;
function flatten(source, shallow) {
    // tslint:disable-next-line:no-shadowed-variable
    function* iterator(source) {
        for (const item of source) {
            // JS string is an Iterable.
            // We exclude it from being flattened
            if (item[Symbol.iterator] !== undefined && typeof item !== "string") {
                yield* shallow ? item : iterator(item);
            }
            else {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(() => iterator(source));
}
exports.flatten = flatten;
function from(source) {
    if (Array.isArray(source)) {
        function* iterator() {
            for (const value of source) {
                yield value;
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    else {
        return new BasicEnumerable_1.BasicEnumerable(() => source);
    }
}
exports.from = from;
function groupBy(source, keySelector, comparer) {
    if (comparer) {
        return groupBy_0(source, keySelector, comparer);
    }
    else {
        return groupBy_0_Simple(source, keySelector);
    }
}
exports.groupBy = groupBy;
function groupBy_0_Simple(source, keySelector) {
    function* iterator() {
        const keyMap = {};
        for (const value of source) {
            const key = keySelector(value);
            const grouping = keyMap[key];
            if (grouping) {
                grouping.push(value);
            }
            else {
                keyMap[key] = new Grouping_1.Grouping(key, value);
            }
        }
        // tslint:disable-next-line:forin
        for (const value in keyMap) {
            yield keyMap[value];
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function groupBy_0(source, keySelector, comparer) {
    function* generate() {
        const keyMap = new Array();
        for (const value of source) {
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
                keyMap.push(new Grouping_1.Grouping(key, value));
            }
        }
        for (const keyValue of keyMap) {
            yield keyValue;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
function groupByWithSel(source, keySelector, elementSelector, comparer) {
    if (comparer) {
        return groupBy_1(source, keySelector, elementSelector, comparer);
    }
    else {
        return groupBy_1_Simple(source, keySelector, elementSelector);
    }
}
exports.groupByWithSel = groupByWithSel;
function groupBy_1_Simple(source, keySelector, elementSelector) {
    function* generate() {
        const keyMap = {};
        for (const value of source) {
            const key = keySelector(value);
            const grouping = keyMap[key];
            const element = elementSelector(value);
            if (grouping) {
                grouping.push(element);
            }
            else {
                keyMap[key] = new Grouping_1.Grouping(key, element);
            }
        }
        /* tslint:disable:forin */
        for (const value in keyMap) {
            yield keyMap[value];
        }
        /* tslint:enable */
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
function groupBy_1(source, keySelector, elementSelector, comparer) {
    function* generate() {
        const keyMap = new Array();
        for (const value of source) {
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
                keyMap.push(new Grouping_1.Grouping(key, element));
            }
        }
        for (const keyValue of keyMap) {
            yield keyValue;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(generate);
}
function groupByAsync(source, keySelector, comparer) {
    if (comparer) {
        return groupByAsync_0(source, keySelector, comparer);
    }
    else {
        return groupByAsync_0_Simple(source, keySelector);
    }
}
exports.groupByAsync = groupByAsync;
function groupByAsync_0_Simple(source, keySelector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_3() {
            const keyMap = {};
            for (const value of source) {
                const key = yield __await(keySelector(value));
                const grouping = keyMap[key];
                if (grouping) {
                    grouping.push(value);
                }
                else {
                    keyMap[key] = new Grouping_1.Grouping(key, value);
                }
            }
            // tslint:disable-next-line:forin
            for (const value in keyMap) {
                yield yield __await(keyMap[value]);
            }
        });
    }
    return async_1.from(iterator);
}
function groupByAsync_0(source, keySelector, comparer) {
    function generate() {
        return __asyncGenerator(this, arguments, function* generate_1() {
            const keyMap = new Array();
            for (const value of source) {
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
                    keyMap.push(new Grouping_1.Grouping(key, value));
                }
            }
            for (const keyValue of keyMap) {
                yield yield __await(keyValue);
            }
        });
    }
    return async_1.from(generate);
}
function groupByWithResult(source, keySelector, resultSelector, comparer) {
    if (comparer) {
        return groupBy_2(source, keySelector, resultSelector, comparer);
    }
    else {
        return groupBy_2_Simple(source, keySelector, resultSelector);
    }
}
exports.groupByWithResult = groupByWithResult;
function groupBy_2_Simple(source, keySelector, resultSelector) {
    function* iterator() {
        const groupByResult = groupBy_0_Simple(source, keySelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function groupBy_2(source, keySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
    function* iterator() {
        const groupByResult = groupBy_0(source, keySelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function GroupByWithResultAndSelector(source, keySelector, elementSelector, resultSelector, comparer) {
    if (comparer) {
        return groupBy_3(source, keySelector, elementSelector, resultSelector);
    }
    else {
        return groupBy_3_Simple(source, keySelector, elementSelector, resultSelector);
    }
}
exports.GroupByWithResultAndSelector = GroupByWithResultAndSelector;
function groupBy_3(source, keySelector, elementSelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
    function* iterator() {
        const groupByResult = groupBy_1(source, keySelector, elementSelector, comparer);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function groupBy_3_Simple(source, keySelector, elementSelector, resultSelector) {
    function* iterator() {
        const groupByResult = groupBy_1_Simple(source, keySelector, elementSelector);
        for (const group of groupByResult) {
            yield resultSelector(group.key, group);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
    function* iterator() {
        const innerArray = [...inner];
        for (const o of outer) {
            const outerKey = outerKeySelector(o);
            for (const i of innerArray) {
                const innerKey = innerKeySelector(i);
                if (comparer(outerKey, innerKey) === true) {
                    yield resultSelector(o, i);
                }
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.join = join;
// tslint:disable:no-shadowed-variable
function intersect(first, second, comparer = shared_1.StrictEqualityComparer) {
    function* iterator() {
        const firstResults = [...first.distinct(comparer)];
        if (firstResults.length === 0) {
            return;
        }
        const secondResults = [...second];
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
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.intersect = intersect;
function intersectAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_4() {
            var e_1, _a;
            const firstResults = [];
            try {
                for (var _b = __asyncValues(first.distinctAsync(comparer)), _c; _c = yield __await(_b.next()), !_c.done;) {
                    const item = _c.value;
                    firstResults.push(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (firstResults.length === 0) {
                return yield __await(void 0);
            }
            const secondResults = [...second];
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
    return async_1.from(iterator);
}
exports.intersectAsync = intersectAsync;
function partition(source, predicate) {
    const fail = [];
    const pass = [];
    for (const value of source) {
        if (predicate(value) === true) {
            pass.push(value);
        }
        else {
            fail.push(value);
        }
    }
    return [fail, pass];
}
exports.partition = partition;
function partitionAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        const fail = [];
        const pass = [];
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                pass.push(value);
            }
            else {
                fail.push(value);
            }
        }
        return [fail, pass];
    });
}
exports.partitionAsync = partitionAsync;
function select(source, selector) {
    if (typeof selector === "string") {
        return select_2(source, selector);
    }
    else {
        return select_1(source, selector);
    }
}
exports.select = select;
function select_1(source, selector) {
    function* iterator() {
        for (const value of source) {
            yield selector(value);
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function select_2(source, key) {
    function* iterator() {
        for (const value of source) {
            yield value[key];
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function selectAsync(source, selector) {
    if (typeof selector === "string") {
        return selectAsync_2(source, selector);
    }
    else {
        return selectAsync_1(source, selector);
    }
}
exports.selectAsync = selectAsync;
function selectAsync_1(source, selector) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_5() {
            for (const value of source) {
                yield yield __await(selector(value));
            }
        });
    }
    return async_1.from(iterator);
}
function selectAsync_2(source, key) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_6() {
            for (const value of source) {
                yield yield __await(value[key]);
            }
        });
    }
    return async_1.from(iterator);
}
function selectMany(source, selector) {
    if (typeof selector === "string") {
        return selectMany_2(source, selector);
    }
    else {
        return selectMany_1(source, selector);
    }
}
exports.selectMany = selectMany;
function selectMany_1(source, selector) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of selector(value)) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function selectMany_2(source, selector) {
    function* iterator() {
        for (const value of source) {
            for (const selectorValue of value[selector]) {
                yield selectorValue;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.selectMany_2 = selectMany_2;
function selectManyAsync(source, selector) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_3() {
            for (const value of source) {
                const innerValues = yield __await(selector(value));
                for (const innerValue of innerValues) {
                    yield yield __await(innerValue);
                }
            }
        });
    }
    return async_1.from(generator);
}
exports.selectManyAsync = selectManyAsync;
/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains more than one element
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
function single(source, predicate) {
    if (predicate) {
        return single_2(source, predicate);
    }
    else {
        return single_1(source);
    }
}
exports.single = single;
function single_1(source) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
        if (hasValue === true) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
        }
        else {
            hasValue = true;
            singleValue = value;
        }
    }
    if (hasValue === false) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return singleValue;
}
function single_2(source, predicate) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
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
    if (hasValue === false) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    }
    return singleValue;
}
/**
 * @throws {InvalidOperationException} Sequence contains more than one matching element
 * @throws {InvalidOperationException} Sequence contains no matching elements
 */
function singleAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasValue = false;
        let singleValue = null;
        for (const value of source) {
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
        if (hasValue === false) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        }
        return singleValue;
    });
}
exports.singleAsync = singleAsync;
/**
 * @throws {InvalidOperationException} More than one element
 */
function singleOrDefault(source, predicate) {
    if (predicate) {
        return singleOrDefault_2(source, predicate);
    }
    else {
        return singleOrDefault_1(source);
    }
}
exports.singleOrDefault = singleOrDefault;
function singleOrDefault_1(source) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
        if (hasValue === true) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
        }
        else {
            hasValue = true;
            singleValue = value;
        }
    }
    return singleValue;
}
function singleOrDefault_2(source, predicate) {
    let hasValue = false;
    let singleValue = null;
    for (const value of source) {
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
    return singleValue;
}
/**
 * @throws {InvalidOperationException} More than one element matchines predicate
 */
function singleOrDefaultAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasValue = false;
        let singleValue = null;
        for (const value of source) {
            if (yield predicate(value)) {
                if (hasValue === true) {
                    throw new shared_1.InvalidOperationException(shared_1.ErrorString.MoreThanOneElement);
                }
                else {
                    hasValue = true;
                    singleValue = value;
                }
            }
        }
        return singleValue;
    });
}
exports.singleOrDefaultAsync = singleOrDefaultAsync;
function skipWhile(source, predicate) {
    if (predicate.length === 1) {
        return skipWhile_1(source, predicate);
    }
    else {
        return skipWhile_2(source, predicate);
    }
}
exports.skipWhile = skipWhile;
function skipWhile_1(source, predicate) {
    function* iterator() {
        let skip = true;
        for (const item of source) {
            if (skip === false) {
                yield item;
            }
            else if (predicate(item) === false) {
                skip = false;
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function skipWhile_2(source, predicate) {
    function* iterator() {
        let index = 0;
        let skip = true;
        for (const item of source) {
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
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function skipWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return skipWhileAsync_1(source, predicate);
    }
    else {
        return skipWhileAsync_2(source, predicate);
    }
}
exports.skipWhileAsync = skipWhileAsync;
function skipWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_7() {
            let skip = true;
            for (const item of source) {
                if (skip === false) {
                    yield yield __await(item);
                }
                else if ((yield __await(predicate(item))) === false) {
                    skip = false;
                    yield yield __await(item);
                }
            }
        });
    }
    return async_1.from(iterator);
}
function skipWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_8() {
            let index = 0;
            let skip = true;
            for (const item of source) {
                if (skip === false) {
                    yield yield __await(item);
                }
                else if ((yield __await(predicate(item, index))) === false) {
                    skip = false;
                    yield yield __await(item);
                }
                index++;
            }
        });
    }
    return async_1.from(iterator);
}
function skip(source, count) {
    function* iterator() {
        let i = 0;
        for (const item of source) {
            if (i++ >= count) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.skip = skip;
/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
function last(source, predicate) {
    if (predicate) {
        return last_2(source, predicate);
    }
    else {
        return last_1(source);
    }
}
exports.last = last;
function last_1(source) {
    let last;
    for (const value of source) {
        last = value;
    }
    if (!last) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    return last;
}
function last_2(source, predicate) {
    let last;
    for (const value of source) {
        if (predicate(value) === true) {
            last = value;
        }
    }
    if (!last) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
    }
    return last;
}
/**
 * @throws {InvalidOperationException} No Matching Element
 */
function lastAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        let last;
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                last = value;
            }
        }
        if (!last) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        }
        return last;
    });
}
exports.lastAsync = lastAsync;
function lastOrDefault(source, predicate) {
    if (predicate) {
        return lastOrDefault_2(source, predicate);
    }
    else {
        return lastOrDefault_1(source);
    }
}
exports.lastOrDefault = lastOrDefault;
function lastOrDefault_1(source) {
    let last = null;
    for (const value of source) {
        last = value;
    }
    return last;
}
function lastOrDefault_2(source, predicate) {
    let last = null;
    for (const value of source) {
        if (predicate(value) === true) {
            last = value;
        }
    }
    return last;
}
function lastOrDefaultAsync(source, predicate) {
    return __awaiter(this, void 0, void 0, function* () {
        let last = null;
        for (const value of source) {
            if ((yield predicate(value)) === true) {
                last = value;
            }
        }
        return last;
    });
}
exports.lastOrDefaultAsync = lastOrDefaultAsync;
function max(source, selector) {
    if (selector) {
        return max_2(source, selector);
    }
    else {
        return max_1(source);
    }
}
exports.max = max;
function max_1(source) {
    let max = null;
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, item);
    }
    if (max === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return max;
    }
}
function max_2(source, selector) {
    let max = null;
    for (const item of source) {
        max = Math.max(max || Number.NEGATIVE_INFINITY, selector(item));
    }
    if (max === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return max;
    }
}
function maxAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let max = null;
        for (const item of source) {
            max = Math.max(max || Number.NEGATIVE_INFINITY, yield selector(item));
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
        return min_2(source, selector);
    }
    else {
        return min_1(source);
    }
}
exports.min = min;
function min_1(source) {
    let min = null;
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, item);
    }
    if (min === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return min;
    }
}
function min_2(source, selector) {
    let min = null;
    for (const item of source) {
        min = Math.min(min || Number.POSITIVE_INFINITY, selector(item));
    }
    if (min === null) {
        throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
    }
    else {
        return min;
    }
}
/**
 * @throws {InvalidOperationException} No Matching Elements
 */
function minAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let min = null;
        for (const item of source) {
            min = Math.min(min || Number.POSITIVE_INFINITY, yield selector(item));
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
function ofType(source, type) {
    const typeCheck = typeof type === "string" ?
        ((x) => typeof x === type) :
        ((x) => x instanceof type);
    function* iterator() {
        for (const item of source) {
            if (typeCheck(item)) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.ofType = ofType;
function orderBy(source, keySelector, comparer) {
    return OrderedEnumerable_1.OrderedEnumerable.generate(source, keySelector, true, comparer);
}
exports.orderBy = orderBy;
function orderByAsync(source, keySelector, comparer) {
    return OrderedEnumerable_1.OrderedEnumerable.generateAsync(source, keySelector, true, comparer);
}
exports.orderByAsync = orderByAsync;
function orderByDescending(source, keySelector, comparer) {
    return OrderedEnumerable_1.OrderedEnumerable.generate(source, keySelector, false, comparer);
}
exports.orderByDescending = orderByDescending;
function orderByDescendingAsync(source, keySelector, comparer) {
    return OrderedEnumerable_1.OrderedEnumerable.generateAsync(source, keySelector, false, comparer);
}
exports.orderByDescendingAsync = orderByDescendingAsync;
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
    function* iterator() {
        const max = start + count;
        for (let i = start; i < max; i++) {
            yield i;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.range = range;
function repeat(element, count) {
    if (count < 0) {
        throw new shared_1.ArgumentOutOfRangeException(`count`);
    }
    function* iterator() {
        for (let i = 0; i < count; i++) {
            yield element;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.repeat = repeat;
/**
 * Reverses an Iterable
 * @param source Iterable
 */
function reverse(source) {
    function* iterator() {
        for (const x of [...source].reverse()) {
            yield x;
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.reverse = reverse;
/**
 * Determines whether or not two sequences are equal
 * @param first first iterable
 * @param second second iterable
 * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
 */
function sequenceEquals(first, second, comparer = shared_1.StrictEqualityComparer) {
    const firstIterator = first[Symbol.iterator]();
    const secondIterator = second[Symbol.iterator]();
    let firstResult = firstIterator.next();
    let secondResult = secondIterator.next();
    while (!firstResult.done && !secondResult.done) {
        if (!comparer(firstResult.value, secondResult.value)) {
            return false;
        }
        firstResult = firstIterator.next();
        secondResult = secondIterator.next();
    }
    return firstResult.done && secondResult.done;
}
exports.sequenceEquals = sequenceEquals;
function sequenceEqualsAsync(first, second, comparer) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstIterator = first[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        let firstResult = firstIterator.next();
        let secondResult = secondIterator.next();
        while (!firstResult.done && !secondResult.done) {
            if ((yield comparer(firstResult.value, secondResult.value)) === false) {
                return false;
            }
            firstResult = firstIterator.next();
            secondResult = secondIterator.next();
        }
        return firstResult.done && secondResult.done;
    });
}
exports.sequenceEqualsAsync = sequenceEqualsAsync;
function sum(source, selector) {
    if (selector) {
        return sum_2(source, selector);
    }
    else {
        return sum_1(source);
    }
}
exports.sum = sum;
function sum_1(source) {
    let sum = 0;
    for (const value of source) {
        sum += value;
    }
    return sum;
}
function sum_2(source, selector) {
    let sum = 0;
    for (const value of source) {
        sum += selector(value);
    }
    return sum;
}
function sumAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let sum = 0;
        for (const value of source) {
            sum += yield selector(value);
        }
        return sum;
    });
}
exports.sumAsync = sumAsync;
function take(source, amount) {
    function* iterator() {
        // negative amounts should yield empty
        let amountLeft = amount > 0 ? amount : 0;
        for (const item of source) {
            if (amountLeft-- === 0) {
                break;
            }
            else {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
exports.take = take;
function takeWhile(source, predicate) {
    if (predicate.length === 1) {
        return takeWhile_1(source, predicate);
    }
    else {
        return takeWhile_2(source, predicate);
    }
}
exports.takeWhile = takeWhile;
function takeWhile_1(source, predicate) {
    function* iterator() {
        for (const item of source) {
            if (predicate(item)) {
                yield item;
            }
            else {
                break;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function takeWhile_2(source, predicate) {
    function* iterator() {
        let index = 0;
        for (const item of source) {
            if (predicate(item, index++)) {
                yield item;
            }
            else {
                break;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function takeWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return takeWhileAsync_1(source, predicate);
    }
    else {
        return takeWhileAsync_2(source, predicate);
    }
}
exports.takeWhileAsync = takeWhileAsync;
function takeWhileAsync_1(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_9() {
            for (const item of source) {
                if (yield __await(predicate(item))) {
                    yield yield __await(item);
                }
                else {
                    break;
                }
            }
        });
    }
    return async_1.from(iterator);
}
function takeWhileAsync_2(source, predicate) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_10() {
            let index = 0;
            for (const item of source) {
                if (yield __await(predicate(item, index++))) {
                    yield yield __await(item);
                }
                else {
                    break;
                }
            }
        });
    }
    return async_1.from(iterator);
}
function toArray(source) {
    return [...source];
}
exports.toArray = toArray;
function toMap(source, selector) {
    const map = new Map();
    for (const value of source) {
        const key = selector(value);
        const array = map.get(key);
        if (array === undefined) {
            map.set(key, [value]);
        }
        else {
            array.push(value);
        }
    }
    return map;
}
exports.toMap = toMap;
function toMapAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = new Map();
        for (const value of source) {
            const key = yield selector(value);
            const array = map.get(key);
            if (array === undefined) {
                map.set(key, [value]);
            }
            else {
                array.push(value);
            }
        }
        return map;
    });
}
exports.toMapAsync = toMapAsync;
function toObject(source, selector) {
    const map = {};
    for (const value of source) {
        map[selector(value)] = value;
    }
    return map;
}
exports.toObject = toObject;
function toObjectAsync(source, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const map = {};
        for (const value of source) {
            map[yield selector(value)] = value;
        }
        return map;
    });
}
exports.toObjectAsync = toObjectAsync;
function toSet(source) {
    return new Set(source);
}
exports.toSet = toSet;
function union(first, second, comparer) {
    if (comparer) {
        return union_2(first, second, comparer);
    }
    else {
        return union_1(first, second);
    }
}
exports.union = union;
function union_1(first, second) {
    function* iterator() {
        const set = new Set();
        for (const item of first) {
            if (set.has(item) === false) {
                yield item;
                set.add(item);
            }
        }
        for (const item of second) {
            if (set.has(item) === false) {
                yield item;
                set.add(item);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function union_2(first, second, comparer) {
    function* iterator() {
        const result = [];
        for (const source of [first, second]) {
            for (const value of source) {
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
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function unionAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_11() {
            const result = [];
            for (const source of [first, second]) {
                for (const value of source) {
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
        });
    }
    return async_1.from(iterator);
}
exports.unionAsync = unionAsync;
function where(source, predicate) {
    if (predicate.length === 1) {
        return where_1(source, predicate);
    }
    else {
        return where_2(source, predicate);
    }
}
exports.where = where;
function where_1(source, predicate) {
    function* iterator() {
        for (const item of source) {
            if (predicate(item) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function where_2(source, predicate) {
    function* iterator() {
        let i = 0;
        for (const item of source) {
            if (predicate(item, i++) === true) {
                yield item;
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function whereAsync(source, predicate) {
    if (predicate.length === 1) {
        return whereAsync_1(source, predicate);
    }
    else {
        return whereAsync_2(source, predicate);
    }
}
exports.whereAsync = whereAsync;
function whereAsync_1(source, predicate) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_4() {
            for (const item of source) {
                if ((yield __await(predicate(item))) === true) {
                    yield yield __await(item);
                }
            }
        });
    }
    return async_1.from(generator);
}
function whereAsync_2(source, predicate) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_5() {
            let i = 0;
            for (const item of source) {
                if ((yield __await(predicate(item, i++))) === true) {
                    yield yield __await(item);
                }
            }
        });
    }
    return async_1.from(generator);
}
function zip(source, second, resultSelector) {
    if (resultSelector) {
        return zip_2(source, second, resultSelector);
    }
    else {
        return zip_1(source, second);
    }
}
exports.zip = zip;
function zip_1(source, second) {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        while (true) {
            const a = firstIterator.next();
            const b = secondIterator.next();
            if (a.done && b.done) {
                break;
            }
            else {
                yield shared_1.AsTuple(a.value, b.value);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function zip_2(source, second, resultSelector) {
    function* iterator() {
        const firstIterator = source[Symbol.iterator]();
        const secondIterator = second[Symbol.iterator]();
        while (true) {
            const a = firstIterator.next();
            const b = secondIterator.next();
            if (a.done && b.done) {
                break;
            }
            else {
                yield resultSelector(a.value, b.value);
            }
        }
    }
    return new BasicEnumerable_1.BasicEnumerable(iterator);
}
function zipAsync(source, second, resultSelector) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_6() {
            const firstIterator = source[Symbol.iterator]();
            const secondIterator = second[Symbol.iterator]();
            while (true) {
                const a = firstIterator.next();
                const b = secondIterator.next();
                if (a.done && b.done) {
                    break;
                }
                else {
                    yield yield __await(resultSelector(a.value, b.value));
                }
            }
        });
    }
    return async_1.from(generator);
}
exports.zipAsync = zipAsync;
