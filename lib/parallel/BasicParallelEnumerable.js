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
const ParallelEnumerable = require("./ParallelEnumerable");
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
            return ParallelEnumerable.aggregate(this, seed, func, resultSelector);
        });
    }
    all(predicate) {
        return ParallelEnumerable.all(this, predicate);
    }
    allAsync(predicate) {
        return ParallelEnumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.any(this, predicate);
        });
    }
    anyAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.anyAsync(this, predicate);
        });
    }
    asAsync() {
        return ParallelEnumerable.asAsync(this);
    }
    average(selector) {
        return ParallelEnumerable.average(this, selector);
    }
    averageAsync(selector) {
        return ParallelEnumerable.averageAsync(this, selector);
    }
    concat(second) {
        return ParallelEnumerable.concat(this, second);
    }
    contains(value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.contains(this, value, comparer);
        });
    }
    containsAsync(value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.containsAsync(this, value, comparer);
        });
    }
    count(predicate) {
        return ParallelEnumerable.count(this, predicate);
    }
    countAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.countAsync(this, predicate);
        });
    }
    distinct(comparer = shared_1.StrictEqualityComparer) {
        return ParallelEnumerable.distinct(this, comparer);
    }
    distinctAsync(comparer) {
        return ParallelEnumerable.distinctAsync(this, comparer);
    }
    each(action) {
        return ParallelEnumerable.each(this, action);
    }
    eachAsync(action) {
        return ParallelEnumerable.eachAsync(this, action);
    }
    elementAt(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.elementAt(this, index);
        });
    }
    elementAtOrDefault(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.elementAtOrDefault(this, index);
        });
    }
    except(second, comparer) {
        return ParallelEnumerable.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return ParallelEnumerable.exceptAsync(this, second, comparer);
    }
    first(predicate) {
        return ParallelEnumerable.first(this, predicate);
    }
    firstAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.firstAsync(this, predicate);
        });
    }
    firstOrDefault(predicate) {
        return ParallelEnumerable.firstOrDefault(this, predicate);
    }
    firstOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.firstOrDefaultAsync(this, predicate);
        });
    }
    groupBy(keySelector, comparer) {
        return ParallelEnumerable.groupBy(this, keySelector, comparer);
    }
    groupByAsync(keySelector, comparer) {
        return ParallelEnumerable.groupByAsync(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return ParallelEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return ParallelEnumerable.intersect(this, second, comparer);
    }
    intersectAsync(second, comparer) {
        return ParallelEnumerable.intersectAsync(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return ParallelEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return ParallelEnumerable.last(this, predicate);
    }
    lastAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.lastAsync(this, predicate);
        });
    }
    lastOrDefault(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.lastOrDefault(this, predicate);
        });
    }
    lastOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.lastOrDefaultAsync(this, predicate);
        });
    }
    max(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.max(this, selector);
        });
    }
    maxAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.maxAsync(this, selector);
        });
    }
    min(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.min(this, selector);
        });
    }
    minAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.minAsync(this, selector);
        });
    }
    ofType(type) {
        return ParallelEnumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return ParallelEnumerable.orderBy(this, predicate, comparer);
    }
    orderByAsync(predicate, comparer) {
        return ParallelEnumerable.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return ParallelEnumerable.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return ParallelEnumerable.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        return ParallelEnumerable.reverse(this);
    }
    select(key) {
        return ParallelEnumerable.select(this, key);
    }
    selectAsync(keyOrSelector) {
        return ParallelEnumerable.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return ParallelEnumerable.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return ParallelEnumerable.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return ParallelEnumerable.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return ParallelEnumerable.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.single(this, predicate);
        });
    }
    singleAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.singleAsync(this, predicate);
        });
    }
    singleOrDefault(predicate) {
        return ParallelEnumerable.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable.singleOrDefaultAsync(this, predicate);
        });
    }
    skip(count) {
        return ParallelEnumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return ParallelEnumerable.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return ParallelEnumerable.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return ParallelEnumerable.sum(this, selector);
    }
    sumAsync(selector) {
        return ParallelEnumerable.sumAsync(this, selector);
    }
    take(amount) {
        return ParallelEnumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return ParallelEnumerable.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return ParallelEnumerable.takeWhileAsync(this, predicate);
    }
    toArray() {
        return ParallelEnumerable.toArray(this);
    }
    toMap(selector) {
        return ParallelEnumerable.toMap(this, selector);
    }
    toMapAsync(selector) {
        return ParallelEnumerable.toMapAsync(this, selector);
    }
    toSet() {
        return ParallelEnumerable.toSet(this);
    }
    union(second, comparer) {
        return ParallelEnumerable.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return ParallelEnumerable.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return ParallelEnumerable.where(this, predicate);
    }
    whereAsync(predicate) {
        return ParallelEnumerable.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return ParallelEnumerable.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return ParallelEnumerable.zipAsync(this, second, resultSelector);
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
