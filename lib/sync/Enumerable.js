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
const shared_1 = require("../shared/shared");
const async_1 = require("./../async/async");
const BasicEnumerable_1 = require("./BasicEnumerable");
const EnumerablePrivate = require("./EnumerablePrivate");
const OrderedEnumerable_1 = require("./OrderedEnumerable");
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
// tslint:disable:no-shadowed-variable
// Enumerable module based on,
// https://msdn.microsoft.com/en-us/library/system.linq.enumerable(v=vs.110).aspx
var asAsync_1 = require("./_private/asAsync");
exports.asAsync = asAsync_1.asAsync;
var asParallel_1 = require("./_private/asParallel");
exports.asParallel = asParallel_1.asParallel;
var average_1 = require("./_private/average");
exports.average = average_1.average;
var averageAsync_1 = require("./_private/averageAsync");
exports.averageAsync = averageAsync_1.averageAsync;
var concat_1 = require("./_private/concat");
exports.concat = concat_1.concat;
var contains_1 = require("./_private/contains");
exports.contains = contains_1.contains;
var containsAsync_1 = require("./_private/containsAsync");
exports.containsAsync = containsAsync_1.containsAsync;
var count_1 = require("./_private/count");
exports.count = count_1.count;
var countAsync_1 = require("./_private/countAsync");
exports.countAsync = countAsync_1.countAsync;
var distinct_1 = require("./_private/distinct");
exports.distinct = distinct_1.distinct;
var distinctAsync_1 = require("./_private/distinctAsync");
exports.distinctAsync = distinctAsync_1.distinctAsync;
var each_1 = require("./_private/each");
exports.each = each_1.each;
var eachAsync_1 = require("./_private/eachAsync");
exports.eachAsync = eachAsync_1.eachAsync;
var elementAt_1 = require("./_private/elementAt");
exports.elementAt = elementAt_1.elementAt;
var elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
exports.elementAtOrDefault = elementAtOrDefault_1.elementAtOrDefault;
var empty_1 = require("./_private/empty");
exports.empty = empty_1.empty;
var enumerateObject_1 = require("./_private/enumerateObject");
exports.enumerateObject = enumerateObject_1.enumerateObject;
var except_1 = require("./_private/except");
exports.except = except_1.except;
var exceptAsync_1 = require("./_private/exceptAsync");
exports.exceptAsync = exceptAsync_1.exceptAsync;
var first_1 = require("./_private/first");
exports.first = first_1.first;
var firstAsync_1 = require("./_private/firstAsync");
exports.firstAsync = firstAsync_1.firstAsync;
function firstOrDefault(source, predicate) {
    if (predicate) {
        return EnumerablePrivate.firstOrDefault_2(source, predicate);
    }
    else {
        return EnumerablePrivate.firstOrDefault_1(source);
    }
}
exports.firstOrDefault = firstOrDefault;
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
        return EnumerablePrivate.groupBy_0(source, keySelector, comparer);
    }
    else {
        return EnumerablePrivate.groupBy_0_Simple(source, keySelector);
    }
}
exports.groupBy = groupBy;
function groupByWithSel(source, keySelector, elementSelector, comparer) {
    if (comparer) {
        return EnumerablePrivate.groupBy_1(source, keySelector, elementSelector, comparer);
    }
    else {
        return EnumerablePrivate.groupBy_1_Simple(source, keySelector, elementSelector);
    }
}
exports.groupByWithSel = groupByWithSel;
function groupByAsync(source, keySelector, comparer) {
    if (comparer) {
        return EnumerablePrivate.groupByAsync_0(source, keySelector, comparer);
    }
    else {
        return EnumerablePrivate.groupByAsync_0_Simple(source, keySelector);
    }
}
exports.groupByAsync = groupByAsync;
function groupByWithResult(source, keySelector, resultSelector, comparer) {
    if (comparer) {
        return EnumerablePrivate.groupBy_2(source, keySelector, resultSelector, comparer);
    }
    else {
        return EnumerablePrivate.groupBy_2_Simple(source, keySelector, resultSelector);
    }
}
exports.groupByWithResult = groupByWithResult;
function GroupByWithResultAndSelector(source, keySelector, elementSelector, resultSelector, comparer) {
    if (comparer) {
        return EnumerablePrivate.groupBy_3(source, keySelector, elementSelector, resultSelector);
    }
    else {
        return EnumerablePrivate.groupBy_3_Simple(source, keySelector, elementSelector, resultSelector);
    }
}
exports.GroupByWithResultAndSelector = GroupByWithResultAndSelector;
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
        return __asyncGenerator(this, arguments, function* iterator_1() {
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
        return EnumerablePrivate.select_2(source, selector);
    }
    else {
        return EnumerablePrivate.select_1(source, selector);
    }
}
exports.select = select;
function selectAsync(source, selector) {
    if (typeof selector === "string") {
        return EnumerablePrivate.selectAsync_2(source, selector);
    }
    else {
        return EnumerablePrivate.selectAsync_1(source, selector);
    }
}
exports.selectAsync = selectAsync;
function selectMany(source, selector) {
    if (typeof selector === "string") {
        return EnumerablePrivate.selectMany_2(source, selector);
    }
    else {
        return EnumerablePrivate.selectMany_1(source, selector);
    }
}
exports.selectMany = selectMany;
function selectManyAsync(source, selector) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_1() {
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
        return EnumerablePrivate.single_2(source, predicate);
    }
    else {
        return EnumerablePrivate.single_1(source);
    }
}
exports.single = single;
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
        return EnumerablePrivate.singleOrDefault_2(source, predicate);
    }
    else {
        return EnumerablePrivate.singleOrDefault_1(source);
    }
}
exports.singleOrDefault = singleOrDefault;
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
function skipWhile(source, predicate) {
    if (predicate.length === 1) {
        return EnumerablePrivate.skipWhile_1(source, predicate);
    }
    else {
        return EnumerablePrivate.skipWhile_2(source, predicate);
    }
}
exports.skipWhile = skipWhile;
function skipWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return EnumerablePrivate.skipWhileAsync_1(source, predicate);
    }
    else {
        return EnumerablePrivate.skipWhileAsync_2(source, predicate);
    }
}
exports.skipWhileAsync = skipWhileAsync;
/**
 * @throws {InvalidOperationException} Sequence contains no elements
 * @throws {InvalidOperationException} Sequence contains no matching element
 */
function last(source, predicate) {
    if (predicate) {
        return EnumerablePrivate.last_2(source, predicate);
    }
    else {
        return EnumerablePrivate.last_1(source);
    }
}
exports.last = last;
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
        return EnumerablePrivate.lastOrDefault_2(source, predicate);
    }
    else {
        return EnumerablePrivate.lastOrDefault_1(source);
    }
}
exports.lastOrDefault = lastOrDefault;
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
        return EnumerablePrivate.max_2(source, selector);
    }
    else {
        return EnumerablePrivate.max_1(source);
    }
}
exports.max = max;
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
        return EnumerablePrivate.min_2(source, selector);
    }
    else {
        return EnumerablePrivate.min_1(source);
    }
}
exports.min = min;
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
        return EnumerablePrivate.sum_2(source, selector);
    }
    else {
        return EnumerablePrivate.sum_1(source);
    }
}
exports.sum = sum;
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
        return EnumerablePrivate.takeWhile_1(source, predicate);
    }
    else {
        return EnumerablePrivate.takeWhile_2(source, predicate);
    }
}
exports.takeWhile = takeWhile;
function takeWhileAsync(source, predicate) {
    if (predicate.length === 1) {
        return EnumerablePrivate.takeWhileAsync_1(source, predicate);
    }
    else {
        return EnumerablePrivate.takeWhileAsync_2(source, predicate);
    }
}
exports.takeWhileAsync = takeWhileAsync;
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
        return EnumerablePrivate.union_2(first, second, comparer);
    }
    else {
        return EnumerablePrivate.union_1(first, second);
    }
}
exports.union = union;
function unionAsync(first, second, comparer) {
    function iterator() {
        return __asyncGenerator(this, arguments, function* iterator_2() {
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
        return EnumerablePrivate.where_1(source, predicate);
    }
    else {
        return EnumerablePrivate.where_2(source, predicate);
    }
}
exports.where = where;
function whereAsync(source, predicate) {
    if (predicate.length === 1) {
        return EnumerablePrivate.whereAsync_1(source, predicate);
    }
    else {
        return EnumerablePrivate.whereAsync_2(source, predicate);
    }
}
exports.whereAsync = whereAsync;
function zip(source, second, resultSelector) {
    if (resultSelector) {
        return EnumerablePrivate.zip_2(source, second, resultSelector);
    }
    else {
        return EnumerablePrivate.zip_1(source, second);
    }
}
exports.zip = zip;
function zipAsync(source, second, resultSelector) {
    function generator() {
        return __asyncGenerator(this, arguments, function* generator_2() {
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
