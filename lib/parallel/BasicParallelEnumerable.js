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
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared/shared");
const aggregate_1 = require("./_private/aggregate");
const all_1 = require("./_private/all");
const allAsync_1 = require("./_private/allAsync");
const any_1 = require("./_private/any");
const anyAsync_1 = require("./_private/anyAsync");
const average_1 = require("./_private/average");
const averageAsync_1 = require("./_private/averageAsync");
const contains_1 = require("./_private/contains");
const containsAsync_1 = require("./_private/containsAsync");
const count_1 = require("./_private/count");
const countAsync_1 = require("./_private/countAsync");
const elementAt_1 = require("./_private/elementAt");
const elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
const first_1 = require("./_private/first");
const firstAsync_1 = require("./_private/firstAsync");
const firstOrDefault_1 = require("./_private/firstOrDefault");
const firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
const last_1 = require("./_private/last");
const lastAsync_1 = require("./_private/lastAsync");
const lastOrDefault_1 = require("./_private/lastOrDefault");
const lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
/*
import { max } from "./_private/max"
import { maxAsync } from "./_private/maxAsync"
import { min } from "./_private/min"
import { minAsync } from "./_private/minAsync"
*/
const single_1 = require("./_private/single");
const singleAsync_1 = require("./_private/singleAsync");
const singleOrDefault_1 = require("./_private/singleOrDefault");
const singleOrDefaultAsync_1 = require("./_private/singleOrDefaultAsync");
const sum_1 = require("./_private/sum");
const sumAsync_1 = require("./_private/sumAsync");
const toArray_1 = require("./_private/toArray");
const toMap_1 = require("./_private/toMap");
const toMapAsync_1 = require("./_private/toMapAsync");
const toSet_1 = require("./_private/toSet");
const ParallelEnumerable_1 = require("./ParallelEnumerable");
/**
 * Base implementation of IParallelEnumerable<T>
 * @private
 */
class BasicParallelEnumerable {
    constructor(dataFunc) {
        this.dataFunc = dataFunc;
    }
    aggregate(seed, func, resultSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            return aggregate_1.aggregate(this, seed, func, resultSelector);
        });
    }
    all(predicate) {
        return all_1.all(this, predicate);
    }
    allAsync(predicate) {
        return allAsync_1.allAsync(this, predicate);
    }
    any(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return any_1.any(this, predicate);
        });
    }
    anyAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return anyAsync_1.anyAsync(this, predicate);
        });
    }
    asAsync() {
        return ParallelEnumerable_1.asAsync(this);
    }
    average(selector) {
        return average_1.average(this, selector);
    }
    averageAsync(selector) {
        return averageAsync_1.averageAsync(this, selector);
    }
    concat(second) {
        return ParallelEnumerable_1.concat(this, second);
    }
    contains(value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            return contains_1.contains(this, value, comparer);
        });
    }
    containsAsync(value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            return containsAsync_1.containsAsync(this, value, comparer);
        });
    }
    count(predicate) {
        return count_1.count(this, predicate);
    }
    countAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return countAsync_1.countAsync(this, predicate);
        });
    }
    distinct(comparer = shared_1.StrictEqualityComparer) {
        return ParallelEnumerable_1.distinct(this, comparer);
    }
    distinctAsync(comparer) {
        return ParallelEnumerable_1.distinctAsync(this, comparer);
    }
    each(action) {
        return ParallelEnumerable_1.each(this, action);
    }
    eachAsync(action) {
        return ParallelEnumerable_1.eachAsync(this, action);
    }
    elementAt(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return elementAt_1.elementAt(this, index);
        });
    }
    elementAtOrDefault(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return elementAtOrDefault_1.elementAtOrDefault(this, index);
        });
    }
    except(second, comparer) {
        return ParallelEnumerable_1.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return ParallelEnumerable_1.exceptAsync(this, second, comparer);
    }
    first(predicate) {
        return first_1.first(this, predicate);
    }
    firstAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return firstAsync_1.firstAsync(this, predicate);
        });
    }
    firstOrDefault(predicate) {
        return firstOrDefault_1.firstOrDefault(this, predicate);
    }
    firstOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return firstOrDefaultAsync_1.firstOrDefaultAsync(this, predicate);
        });
    }
    groupBy(keySelector, comparer) {
        return ParallelEnumerable_1.groupBy(this, keySelector, comparer);
    }
    groupByAsync(keySelector, comparer) {
        return ParallelEnumerable_1.groupByAsync(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return ParallelEnumerable_1.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return ParallelEnumerable_1.intersect(this, second, comparer);
    }
    intersectAsync(second, comparer) {
        return ParallelEnumerable_1.intersectAsync(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return ParallelEnumerable_1.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return last_1.last(this, predicate);
    }
    lastAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return lastAsync_1.lastAsync(this, predicate);
        });
    }
    lastOrDefault(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return lastOrDefault_1.lastOrDefault(this, predicate);
        });
    }
    lastOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return lastOrDefaultAsync_1.lastOrDefaultAsync(this, predicate);
        });
    }
    max(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.max(this, selector);
        });
    }
    maxAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.maxAsync(this, selector);
        });
    }
    min(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.min(this, selector);
        });
    }
    minAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.minAsync(this, selector);
        });
    }
    ofType(type) {
        return ParallelEnumerable_1.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return ParallelEnumerable_1.orderBy(this, predicate, comparer);
    }
    orderByAsync(predicate, comparer) {
        return ParallelEnumerable_1.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return ParallelEnumerable_1.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return ParallelEnumerable_1.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        return ParallelEnumerable_1.reverse(this);
    }
    select(key) {
        return ParallelEnumerable_1.select(this, key);
    }
    selectAsync(keyOrSelector) {
        return ParallelEnumerable_1.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return ParallelEnumerable_1.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return ParallelEnumerable_1.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return ParallelEnumerable_1.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return ParallelEnumerable_1.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return single_1.single(this, predicate);
        });
    }
    singleAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return singleAsync_1.singleAsync(this, predicate);
        });
    }
    singleOrDefault(predicate) {
        return singleOrDefault_1.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return singleOrDefaultAsync_1.singleOrDefaultAsync(this, predicate);
        });
    }
    // tslint:disable-next-line:no-shadowed-variable
    skip(count) {
        return ParallelEnumerable_1.skip(this, count);
    }
    skipWhile(predicate) {
        return ParallelEnumerable_1.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return ParallelEnumerable_1.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return sum_1.sum(this, selector);
    }
    sumAsync(selector) {
        return sumAsync_1.sumAsync(this, selector);
    }
    take(amount) {
        return ParallelEnumerable_1.take(this, amount);
    }
    takeWhile(predicate) {
        return ParallelEnumerable_1.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return ParallelEnumerable_1.takeWhileAsync(this, predicate);
    }
    toArray() {
        return toArray_1.toArray(this);
    }
    toMap(selector) {
        return toMap_1.toMap(this, selector);
    }
    toMapAsync(selector) {
        return toMapAsync_1.toMapAsync(this, selector);
    }
    toSet() {
        return toSet_1.toSet(this);
    }
    union(second, comparer) {
        return ParallelEnumerable_1.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return ParallelEnumerable_1.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return ParallelEnumerable_1.where(this, predicate);
    }
    whereAsync(predicate) {
        return ParallelEnumerable_1.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return ParallelEnumerable_1.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return ParallelEnumerable_1.zipAsync(this, second, resultSelector);
    }
    [Symbol.asyncIterator]() {
        const thisOuter = this;
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_1() {
                const dataFunc = thisOuter.dataFunc;
                switch (dataFunc.type) {
                    case 1 /* ArrayOfPromises */:
                        for (const value of dataFunc.generator()) {
                            yield yield __await(value);
                        }
                        break;
                    case 2 /* PromiseOfPromises */:
                        for (const value of yield __await(dataFunc.generator())) {
                            yield yield __await(value);
                        }
                        break;
                    case 0 /* PromiseToArray */:
                    default:
                        for (const value of yield __await(dataFunc.generator())) {
                            yield yield __await(value);
                        }
                        break;
                }
            });
        }
        return iterator();
    }
}
exports.BasicParallelEnumerable = BasicParallelEnumerable;
