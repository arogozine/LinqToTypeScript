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
Object.defineProperty(exports, "__esModule", { value: true });
const parallel_1 = require("../parallel/parallel");
const shared_1 = require("../shared/shared");
const AsyncEnumerable_1 = require("./../async/AsyncEnumerable");
const BasicEnumerable_1 = require("./BasicEnumerable");
const Grouping_1 = require("./Grouping");
const OrderedEnumerable_1 = require("./OrderedEnumerable");
// Enumerable class based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx
/**
 * Container for all static methods dealing with IEnumerable<T> / Iterable type
 */
class Enumerable {
    static aggregate(source, seedOrFunc, func, resultSelector) {
        if (resultSelector) {
            if (!func) {
                throw new ReferenceError(`TAccumulate function is undefined`);
            }
            return Enumerable.aggregate_3(source, seedOrFunc, func, resultSelector);
        }
        else if (func) {
            return Enumerable.aggregate_2(source, seedOrFunc, func);
        }
        else {
            return Enumerable.aggregate_1(source, seedOrFunc);
        }
    }
    /**
     * @throws {InvalidOperationException} No Elements
     */
    static aggregate_1(source, func) {
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
    static aggregate_2(source, seed, func) {
        let aggregateValue = seed;
        for (const value of source) {
            aggregateValue = func(aggregateValue, value);
        }
        return aggregateValue;
    }
    static aggregate_3(source, seed, func, resultSelector) {
        let aggregateValue = seed;
        for (const value of source) {
            aggregateValue = func(aggregateValue, value);
        }
        return resultSelector(aggregateValue);
    }
    static all(source, predicate) {
        for (const item of source) {
            if (predicate(item) === false) {
                return false;
            }
        }
        return true;
    }
    static allAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of source) {
                if ((yield predicate(item)) === false) {
                    return false;
                }
            }
            return true;
        });
    }
    static any(source, predicate) {
        if (predicate) {
            return Enumerable.any_2(source, predicate);
        }
        else {
            return Enumerable.any_1(source);
        }
    }
    static any_1(source) {
        for (const _ of source) {
            return true;
        }
        return false;
    }
    static any_2(source, predicate) {
        for (const item of source) {
            if (predicate(item) === true) {
                return true;
            }
        }
        return false;
    }
    static anyAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of source) {
                if ((yield predicate(item)) === true) {
                    return true;
                }
            }
            return false;
        });
    }
    /**
     * Converts the iterable to an @see {IAsyncEnumerable}
     */
    static asAsync(source) {
        function generator() {
            return __asyncGenerator(this, arguments, function* generator_1() {
                for (const value of source) {
                    yield value;
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(generator);
    }
    /**
     * Converts an iterable to @see {IAsyncParallel}
     */
    static asParallel(source) {
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
    static average(source, selector) {
        if (selector) {
            return Enumerable.average_2(source, selector);
        }
        else {
            return Enumerable.average_1(source);
        }
    }
    static average_1(source) {
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
    static average_2(source, func) {
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
    static averageAsync(source, func) {
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
    static concat(first, second) {
        function* iterator() {
            yield* first;
            yield* second;
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static contains(source, value, comparer = shared_1.StrictEqualityComparer) {
        for (const item of source) {
            if (comparer(value, item)) {
                return true;
            }
        }
        return false;
    }
    static containsAsync(source, value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of source) {
                if (yield comparer(value, item)) {
                    return true;
                }
            }
            return false;
        });
    }
    static count(source, predicate) {
        if (predicate) {
            return Enumerable.count_2(source, predicate);
        }
        else {
            return Enumerable.count_1(source);
        }
    }
    static count_1(source) {
        let count = 0;
        for (const _ of source) {
            count++;
        }
        return count;
    }
    static count_2(source, predicate) {
        let count = 0;
        for (const value of source) {
            if (predicate(value) === true) {
                count++;
            }
        }
        return count;
    }
    static countAsync(source, predicate) {
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
    static distinct(source, comparer = shared_1.StrictEqualityComparer) {
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
    static distinctAsync(source, comparer) {
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
                    yield item;
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static each(source, action) {
        function* generator() {
            for (const value of source) {
                action(value);
                yield value;
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(generator);
    }
    static eachAsync(source, action) {
        function generator() {
            return __asyncGenerator(this, arguments, function* generator_2() {
                for (const value of source) {
                    yield __await(action(value));
                    yield value;
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(generator);
    }
    /**
     * Returns Element at specified position
     * @throws {ArgumentOutOfRangeException} Index outside of iteration
     * @param source Iteration of Elements
     * @param index Index for Element
     */
    static elementAt(source, index) {
        let i = 0;
        for (const item of source) {
            if (index === i++) {
                return item;
            }
        }
        throw new shared_1.ArgumentOutOfRangeException("index");
    }
    static elementAtOrDefault(source, index) {
        let i = 0;
        for (const item of source) {
            if (index === i++) {
                return item;
            }
        }
        return null;
    }
    /**
     * Empty Enumerable
     */
    static empty() {
        const iterator = function* () {
            for (const x of []) {
                yield x;
            }
        };
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static enumerateObject(source) {
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
    static except(first, second, comparer = shared_1.EqualityComparer) {
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
    static exceptAsync(first, second, comparer) {
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
                        yield firstItem;
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static first(source, predicate) {
        if (predicate) {
            return Enumerable.first_2(source, predicate);
        }
        else {
            return Enumerable.first_1(source);
        }
    }
    static first_1(source) {
        const first = source[Symbol.iterator]().next();
        if (first.done === true) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return first.value;
    }
    static first_2(source, predicate) {
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
    static firstAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const value of source) {
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        });
    }
    static firstOrDefault(source, predicate) {
        if (predicate) {
            return Enumerable.firstOrDefault_2(source, predicate);
        }
        else {
            return Enumerable.firstOrDefault_1(source);
        }
    }
    static firstOrDefault_1(source) {
        const first = source[Symbol.iterator]().next();
        return first.value || null;
    }
    static firstOrDefault_2(source, predicate) {
        for (const value of source) {
            if (predicate(value) === true) {
                return value;
            }
        }
        return null;
    }
    static firstOrDefaultAsync(source, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const value of source) {
                if ((yield predicate(value)) === true) {
                    return value;
                }
            }
            return null;
        });
    }
    static flatten(source, shallow) {
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
    static from(source) {
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
    static groupBy(source, keySelector, comparer) {
        if (comparer) {
            return Enumerable.groupBy_0(source, keySelector, comparer);
        }
        else {
            return Enumerable.groupBy_0_Simple(source, keySelector);
        }
    }
    static groupBy_0_Simple(source, keySelector) {
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
    static groupBy_0(source, keySelector, comparer) {
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
    static groupByWithSel(source, keySelector, elementSelector, comparer) {
        if (comparer) {
            return Enumerable.groupBy_1(source, keySelector, elementSelector, comparer);
        }
        else {
            return Enumerable.groupBy_1_Simple(source, keySelector, elementSelector);
        }
    }
    static groupBy_1_Simple(source, keySelector, elementSelector) {
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
    static groupBy_1(source, keySelector, elementSelector, comparer) {
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
    static groupByAsync(source, keySelector, comparer) {
        if (comparer) {
            return Enumerable.groupByAsync_0(source, keySelector, comparer);
        }
        else {
            return Enumerable.groupByAsync_0_Simple(source, keySelector);
        }
    }
    static groupByAsync_0_Simple(source, keySelector) {
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
                    yield keyMap[value];
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static groupByAsync_0(source, keySelector, comparer) {
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
                    yield keyValue;
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(generate);
    }
    static groupByWithResult(source, keySelector, resultSelector, comparer) {
        if (comparer) {
            return Enumerable.groupBy_2(source, keySelector, resultSelector, comparer);
        }
        else {
            return Enumerable.groupBy_2_Simple(source, keySelector, resultSelector);
        }
    }
    static groupBy_2_Simple(source, keySelector, resultSelector) {
        function* iterator() {
            const groupByResult = Enumerable.groupBy_0_Simple(source, keySelector);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static groupBy_2(source, keySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
        function* iterator() {
            const groupByResult = Enumerable.groupBy_0(source, keySelector, comparer);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static GroupByWithResultAndSelector(source, keySelector, elementSelector, resultSelector, comparer) {
        if (comparer) {
            return Enumerable.groupBy_3(source, keySelector, elementSelector, resultSelector);
        }
        else {
            return Enumerable.groupBy_3_Simple(source, keySelector, elementSelector, resultSelector);
        }
    }
    static groupBy_3(source, keySelector, elementSelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
        function* iterator() {
            const groupByResult = Enumerable.groupBy_1(source, keySelector, elementSelector, comparer);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static groupBy_3_Simple(source, keySelector, elementSelector, resultSelector) {
        function* iterator() {
            const groupByResult = Enumerable.groupBy_1_Simple(source, keySelector, elementSelector);
            for (const group of groupByResult) {
                yield resultSelector(group.key, group);
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static join(outer, inner, outerKeySelector, innerKeySelector, resultSelector, comparer = shared_1.StrictEqualityComparer) {
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
    static intersect(first, second, comparer = shared_1.StrictEqualityComparer) {
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
    static intersectAsync(first, second, comparer) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_4() {
                const firstResults = [];
                try {
                    for (var _a = __asyncValues(first.distinctAsync(comparer)), _b; _b = yield __await(_a.next()), !_b.done;) {
                        const item = yield __await(_b.value);
                        firstResults.push(item);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) yield __await(_c.call(_a));
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (firstResults.length === 0) {
                    return;
                }
                const secondResults = [...second];
                for (let i = 0; i < firstResults.length; i++) {
                    const firstValue = firstResults[i];
                    for (let j = 0; j < secondResults.length; j++) {
                        const secondValue = secondResults[j];
                        if ((yield __await(comparer(firstValue, secondValue))) === true) {
                            yield firstValue;
                            break;
                        }
                    }
                }
                var e_1, _c;
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static partition(source, predicate) {
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
    static partitionAsync(source, predicate) {
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
    static select(source, selector) {
        if (typeof selector === "string") {
            return Enumerable.select_2(source, selector);
        }
        else {
            return Enumerable.select_1(source, selector);
        }
    }
    static select_1(source, selector) {
        function* iterator() {
            for (const value of source) {
                yield selector(value);
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static select_2(source, key) {
        function* iterator() {
            for (const value of source) {
                yield value[key];
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static selectAsync(source, selector) {
        if (typeof selector === "string") {
            return Enumerable.selectAsync_2(source, selector);
        }
        else {
            return Enumerable.selectAsync_1(source, selector);
        }
    }
    static selectAsync_1(source, selector) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_5() {
                for (const value of source) {
                    yield selector(value);
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static selectAsync_2(source, key) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_6() {
                for (const value of source) {
                    yield value[key];
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static selectMany(source, selector) {
        if (typeof selector === "string") {
            return Enumerable.selectMany_2(source, selector);
        }
        else {
            return Enumerable.selectMany_1(source, selector);
        }
    }
    static selectMany_1(source, selector) {
        function* iterator() {
            for (const value of source) {
                for (const selectorValue of selector(value)) {
                    yield selectorValue;
                }
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static selectMany_2(source, selector) {
        function* iterator() {
            for (const value of source) {
                for (const selectorValue of value[selector]) {
                    yield selectorValue;
                }
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static selectManyAsync(source, selector) {
        function generator() {
            return __asyncGenerator(this, arguments, function* generator_3() {
                for (const value of source) {
                    const innerValues = yield __await(selector(value));
                    for (const innerValue of innerValues) {
                        yield innerValue;
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(generator);
    }
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains more than one element
     * @throws {InvalidOperationException} Sequence contains more than one matching element
     * @throws {InvalidOperationException} Sequence contains no matching elements
     */
    static single(source, predicate) {
        if (predicate) {
            return Enumerable.single_2(source, predicate);
        }
        else {
            return Enumerable.single_1(source);
        }
    }
    static single_1(source) {
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
    static single_2(source, predicate) {
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
    static singleAsync(source, predicate) {
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
    /**
     * @throws {InvalidOperationException} More than one element
     */
    static singleOrDefault(source, predicate) {
        if (predicate) {
            return Enumerable.singleOrDefault_2(source, predicate);
        }
        else {
            return Enumerable.singleOrDefault_1(source);
        }
    }
    static singleOrDefault_1(source) {
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
    static singleOrDefault_2(source, predicate) {
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
    static singleOrDefaultAsync(source, predicate) {
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
    static skipWhile(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.skipWhile_1(source, predicate);
        }
        else {
            return Enumerable.skipWhile_2(source, predicate);
        }
    }
    static skipWhile_1(source, predicate) {
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
    static skipWhile_2(source, predicate) {
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
    static skipWhileAsync(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.skipWhileAsync_1(source, predicate);
        }
        else {
            return Enumerable.skipWhileAsync_2(source, predicate);
        }
    }
    static skipWhileAsync_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_7() {
                let skip = true;
                for (const item of source) {
                    if (skip === false) {
                        yield item;
                    }
                    else if ((yield __await(predicate(item))) === false) {
                        skip = false;
                        yield item;
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static skipWhileAsync_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_8() {
                let index = 0;
                let skip = true;
                for (const item of source) {
                    if (skip === false) {
                        yield item;
                    }
                    else if ((yield __await(predicate(item, index))) === false) {
                        skip = false;
                        yield item;
                    }
                    index++;
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static skip(source, count) {
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
    /**
     * @throws {InvalidOperationException} Sequence contains no elements
     * @throws {InvalidOperationException} Sequence contains no matching element
     */
    static last(source, predicate) {
        if (predicate) {
            return Enumerable.last_2(source, predicate);
        }
        else {
            return Enumerable.last_1(source);
        }
    }
    static last_1(source) {
        let last;
        for (const value of source) {
            last = value;
        }
        if (!last) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        return last;
    }
    static last_2(source, predicate) {
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
    static lastAsync(source, predicate) {
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
    static lastOrDefault(source, predicate) {
        if (predicate) {
            return Enumerable.lastOrDefault_2(source, predicate);
        }
        else {
            return Enumerable.lastOrDefault_1(source);
        }
    }
    static lastOrDefault_1(source) {
        let last = null;
        for (const value of source) {
            last = value;
        }
        return last;
    }
    static lastOrDefault_2(source, predicate) {
        let last = null;
        for (const value of source) {
            if (predicate(value) === true) {
                last = value;
            }
        }
        return last;
    }
    static lastOrDefaultAsync(source, predicate) {
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
    static max(source, selector) {
        if (selector) {
            return Enumerable.max_2(source, selector);
        }
        else {
            return Enumerable.max_1(source);
        }
    }
    static max_1(source) {
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
    static max_2(source, selector) {
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
    static maxAsync(source, selector) {
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
    static min(source, selector) {
        if (selector) {
            return Enumerable.min_2(source, selector);
        }
        else {
            return Enumerable.min_1(source);
        }
    }
    static min_1(source) {
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
    static min_2(source, selector) {
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
    static minAsync(source, selector) {
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
    static ofType(source, type) {
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
    static orderBy(source, keySelector, comparer) {
        return OrderedEnumerable_1.OrderedEnumerable.generate(source, keySelector, true, comparer);
    }
    static orderByAsync(source, keySelector, comparer) {
        return OrderedEnumerable_1.OrderedEnumerable.generateAsync(source, keySelector, true, comparer);
    }
    static orderByDescending(source, keySelector, comparer) {
        return OrderedEnumerable_1.OrderedEnumerable.generate(source, keySelector, false, comparer);
    }
    static orderByDescendingAsync(source, keySelector, comparer) {
        return OrderedEnumerable_1.OrderedEnumerable.generateAsync(source, keySelector, false, comparer);
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
        function* iterator() {
            const max = start + count;
            for (let i = start; i < max; i++) {
                yield i;
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static repeat(element, count) {
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
    /**
     * Reverses an Iterable
     * @param source Iterable
     */
    static reverse(source) {
        function* iterator() {
            for (const x of [...source].reverse()) {
                yield x;
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    /**
     * Determines whether or not two sequences are equal
     * @param first first iterable
     * @param second second iterable
     * @param comparer Compare function to use, by default is @see {StrictEqualityComparer}
     */
    static sequenceEquals(first, second, comparer = shared_1.StrictEqualityComparer) {
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
    static sequenceEqualsAsync(first, second, comparer) {
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
    static sum(source, selector) {
        if (selector) {
            return Enumerable.sum_2(source, selector);
        }
        else {
            return Enumerable.sum_1(source);
        }
    }
    static sum_1(source) {
        let sum = 0;
        for (const value of source) {
            sum += value;
        }
        return sum;
    }
    static sum_2(source, selector) {
        let sum = 0;
        for (const value of source) {
            sum += selector(value);
        }
        return sum;
    }
    static sumAsync(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let sum = 0;
            for (const value of source) {
                sum += yield selector(value);
            }
            return sum;
        });
    }
    static take(source, amount) {
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
    static takeWhile(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.takeWhile_1(source, predicate);
        }
        else {
            return Enumerable.takeWhile_2(source, predicate);
        }
    }
    static takeWhile_1(source, predicate) {
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
    static takeWhile_2(source, predicate) {
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
    static takeWhileAsync(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.takeWhileAsync_1(source, predicate);
        }
        else {
            return Enumerable.takeWhileAsync_2(source, predicate);
        }
    }
    static takeWhileAsync_1(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_9() {
                for (const item of source) {
                    if (yield __await(predicate(item))) {
                        yield item;
                    }
                    else {
                        break;
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static takeWhileAsync_2(source, predicate) {
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_10() {
                let index = 0;
                for (const item of source) {
                    if (yield __await(predicate(item, index++))) {
                        yield item;
                    }
                    else {
                        break;
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static toArray(source) {
        return [...source];
    }
    static toMap(source, selector) {
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
    static toMapAsync(source, selector) {
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
    static toObject(source, selector) {
        const map = {};
        for (const value of source) {
            map[selector(value)] = value;
        }
        return map;
    }
    static toObjectAsync(source, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const map = {};
            for (const value of source) {
                map[yield selector(value)] = value;
            }
            return map;
        });
    }
    static toSet(source) {
        return new Set(source);
    }
    static union(first, second, comparer) {
        if (comparer) {
            return Enumerable.union_2(first, second, comparer);
        }
        else {
            return Enumerable.union_1(first, second);
        }
    }
    static union_1(first, second) {
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
    static union_2(first, second, comparer) {
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
    static unionAsync(first, second, comparer) {
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
                            yield value;
                            result.push(value);
                        }
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(iterator);
    }
    static where(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.where_1(source, predicate);
        }
        else {
            return Enumerable.where_2(source, predicate);
        }
    }
    static where_1(source, predicate) {
        function* iterator() {
            for (const item of source) {
                if (predicate(item) === true) {
                    yield item;
                }
            }
        }
        return new BasicEnumerable_1.BasicEnumerable(iterator);
    }
    static where_2(source, predicate) {
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
    static whereAsync(source, predicate) {
        if (predicate.length === 1) {
            return Enumerable.whereAsync_1(source, predicate);
        }
        else {
            return Enumerable.whereAsync_2(source, predicate);
        }
    }
    static whereAsync_1(source, predicate) {
        function generator() {
            return __asyncGenerator(this, arguments, function* generator_4() {
                for (const item of source) {
                    if ((yield __await(predicate(item))) === true) {
                        yield item;
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(generator);
    }
    static whereAsync_2(source, predicate) {
        function generator() {
            return __asyncGenerator(this, arguments, function* generator_5() {
                let i = 0;
                for (const item of source) {
                    if ((yield __await(predicate(item, i++))) === true) {
                        yield item;
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(generator);
    }
    static zip(source, second, resultSelector) {
        if (resultSelector) {
            return Enumerable.zip_2(source, second, resultSelector);
        }
        else {
            return Enumerable.zip_1(source, second);
        }
    }
    static zip_1(source, second) {
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
    static zip_2(source, second, resultSelector) {
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
    static zipAsync(source, second, resultSelector) {
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
                        yield resultSelector(a.value, b.value);
                    }
                }
            });
        }
        return AsyncEnumerable_1.AsyncEnumerable.from(generator);
    }
    constructor() {
        /* */
    }
}
exports.Enumerable = Enumerable;
Object.freeze(Enumerable);
