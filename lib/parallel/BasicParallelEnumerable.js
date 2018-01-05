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
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared/shared");
const ParallelEnumerable_1 = require("./ParallelEnumerable");
class BasicParallelEnumerable {
    constructor(dataFunc) {
        this.dataFunc = dataFunc;
    }
    aggregate(seed, func, resultSelector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.aggregate(this, seed, func, resultSelector);
        });
    }
    all(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.all(this, predicate);
    }
    allAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.any(this, predicate);
        });
    }
    anyAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.anyAsync(this, predicate);
        });
    }
    average(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.average(selector);
    }
    averageAsync(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.averageAsync(this, selector);
    }
    concat(second) {
        return ParallelEnumerable_1.ParallelEnumerable.concat(this, second);
    }
    contains(value, comparer) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.contains(this, value, comparer);
        });
    }
    count(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.count(this, predicate);
    }
    countAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.countAsync(this, predicate);
        });
    }
    distinct(comparer = shared_1.StrictEqualityComparer) {
        return ParallelEnumerable_1.ParallelEnumerable.distinct(this, comparer);
    }
    each(action) {
        return ParallelEnumerable_1.ParallelEnumerable.each(this, action);
    }
    eachAsync(action) {
        return ParallelEnumerable_1.ParallelEnumerable.eachAsync(this, action);
    }
    elementAt(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.elementAt(this, index);
        });
    }
    elementAtOrDefault(index) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.elementAtOrDefault(this, index);
        });
    }
    except(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.except(this, second, comparer);
    }
    first(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.first(this, predicate);
    }
    firstAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.firstAsync(this, predicate);
        });
    }
    firstOrDefault(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.firstOrDefault(this, predicate);
    }
    firstOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.firstOrDefaultAsync(this, predicate);
        });
    }
    groupBy(keySelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.last(this, predicate);
    }
    lastAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.lastAsync(this, predicate);
        });
    }
    lastOrDefault(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.lastOrDefault(this, predicate);
        });
    }
    lastOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.lastOrDefaultAsync(this, predicate);
        });
    }
    max(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.max(this, selector);
        });
    }
    maxAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.maxAsync(this, selector);
        });
    }
    min(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.min(this, selector);
        });
    }
    minAsync(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.minAsync(this, selector);
        });
    }
    ofType(type) {
        return ParallelEnumerable_1.ParallelEnumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.orderBy(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.orderByDescending(this, predicate, comparer);
    }
    reverse() {
        return ParallelEnumerable_1.ParallelEnumerable.reverse(this);
    }
    select(key) {
        return ParallelEnumerable_1.ParallelEnumerable.select(this, key);
    }
    selectAsync(keyOrSelector) {
        return ParallelEnumerable_1.ParallelEnumerable.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.selectMany(this, selector);
    }
    sequenceEquals(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.sequenceEquals(this, second, comparer);
    }
    single(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.single(this, predicate);
        });
    }
    singleAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.singleAsync(this, predicate);
        });
    }
    singleOrDefault(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return ParallelEnumerable_1.ParallelEnumerable.singleOrDefaultAsync(this, predicate);
        });
    }
    skip(count) {
        return ParallelEnumerable_1.ParallelEnumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.sum(this, selector);
    }
    sumAsync(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.sumAsync(this, selector);
    }
    take(amount) {
        return ParallelEnumerable_1.ParallelEnumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.takeWhileAsync(this, predicate);
    }
    toArray() {
        return ParallelEnumerable_1.ParallelEnumerable.toArray(this);
    }
    toMap(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.toMap(this, selector);
    }
    toMapAsync(selector) {
        return ParallelEnumerable_1.ParallelEnumerable.toMapAsync(this, selector);
    }
    toSet() {
        return ParallelEnumerable_1.ParallelEnumerable.toSet(this);
    }
    union(second, comparer) {
        return ParallelEnumerable_1.ParallelEnumerable.union(this, second, comparer);
    }
    where(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.where(this, predicate);
    }
    whereAsync(predicate) {
        return ParallelEnumerable_1.ParallelEnumerable.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return ParallelEnumerable_1.ParallelEnumerable.zip(this, second, resultSelector);
    }
    [Symbol.asyncIterator]() {
        const toArray = this.toArray;
        const thisOuter = this;
        function iterator() {
            return __asyncGenerator(this, arguments, function* iterator_1() {
                for (const value of yield __await(toArray.apply(thisOuter))) {
                    yield value;
                }
            });
        }
        return iterator();
    }
}
exports.BasicParallelEnumerable = BasicParallelEnumerable;
