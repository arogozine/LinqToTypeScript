"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parallel_1 = require("../parallel/parallel");
const shared_1 = require("./../shared/shared");
const BasicEnumerable_1 = require("./BasicEnumerable");
const Enumerable = require("./Enumerable");
/**
 * Array backed Enumerable
 */
class ArrayEnumerable extends Array {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return super.every(predicate);
    }
    allAsync(predicate) {
        return Enumerable.allAsync(this, predicate);
    }
    any(predicate) {
        if (predicate) {
            return this.some(predicate);
        }
        else {
            return this.length !== 0;
        }
    }
    anyAsync(predicate) {
        return Enumerable.anyAsync(this, predicate);
    }
    asAsync() {
        return Enumerable.asAsync(this);
    }
    asParallel() {
        return parallel_1.ParallelEnumerable.from(0 /* PromiseToArray */, () => __awaiter(this, void 0, void 0, function* () { return this; }));
    }
    average(selector) {
        return Enumerable.average(this, selector);
    }
    averageAsync(selector) {
        return Enumerable.averageAsync(this, selector);
    }
    concat() {
        let items;
        if (arguments.length === 1) {
            items = arguments[0];
        }
        else {
            items = [...arguments];
        }
        if (items instanceof BasicEnumerable_1.BasicEnumerable) {
            // this scoping
            const enumerable = this;
            function* iterator() {
                for (const x of enumerable) {
                    yield x;
                }
                for (const x of items) {
                    yield x;
                }
            }
            return new BasicEnumerable_1.BasicEnumerable(iterator);
        }
        else {
            return super.concat.apply(this, [items]);
        }
    }
    contains(value, comparer) {
        return Enumerable.contains(this, value, comparer);
    }
    containsAsync(value, comparer) {
        return Enumerable.containsAsync(this, value, comparer);
    }
    count(predicate) {
        if (predicate) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (predicate(this[i]) === true) {
                    count++;
                }
            }
            return count;
        }
        else {
            return this.length;
        }
    }
    countAsync(predicate) {
        return Enumerable.countAsync(this, predicate);
    }
    distinct(comparer) {
        return Enumerable.distinct(this, comparer);
    }
    distinctAsync(comparer) {
        return Enumerable.distinctAsync(this, comparer);
    }
    elementAt(index) {
        if (index < 0 || index >= this.length) {
            throw new shared_1.ArgumentOutOfRangeException("index");
        }
        return this[index];
    }
    elementAtOrDefault(index) {
        return this[index] || null;
    }
    except(second, comparer) {
        return Enumerable.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return Enumerable.exceptAsync(this, second, comparer);
    }
    first(predicate) {
        if (predicate) {
            const value = this.find(predicate);
            if (value === undefined) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
            }
            else {
                return value;
            }
        }
        else {
            if (this.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return this[0];
        }
    }
    firstAsync(predicate) {
        return Enumerable.firstAsync(this, predicate);
    }
    firstOrDefault(predicate) {
        if (predicate) {
            const value = this.find(predicate);
            if (value === undefined) {
                return null;
            }
            else {
                return value;
            }
        }
        else {
            return this.length === 0 ? null : this[0];
        }
    }
    firstOrDefaultAsync(predicate) {
        return Enumerable.firstOrDefaultAsync(this, predicate);
    }
    each(action) {
        return Enumerable.each(this, action);
    }
    eachAsync(action) {
        return Enumerable.eachAsync(this, action);
    }
    groupBy(keySelector, comparer) {
        return Enumerable.groupBy(this, keySelector, comparer);
    }
    groupByAsync(keySelector, comparer) {
        return Enumerable.groupByAsync(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return Enumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return Enumerable.intersect(this, second, comparer);
    }
    intersectAsync(second, comparer) {
        return Enumerable.intersectAsync(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i];
                if (predicate(value) === true) {
                    return value;
                }
            }
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoMatch);
        }
        else {
            if (this.length === 0) {
                throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
            }
            return this[this.length - 1];
        }
    }
    lastAsync(predicate) {
        return Enumerable.lastAsync(this, predicate);
    }
    lastOrDefault(predicate) {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i];
                if (predicate(value) === true) {
                    return value;
                }
            }
            return null;
        }
        else {
            return this.length === 0 ? null : this[this.length - 1];
        }
    }
    lastOrDefaultAsync(predicate) {
        return Enumerable.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        if (this.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        if (selector) {
            let max = Number.NEGATIVE_INFINITY;
            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max);
            }
            return max;
        }
        else {
            return Math.max.apply(null, this);
        }
    }
    maxAsync(selector) {
        return Enumerable.maxAsync(this, selector);
    }
    min(selector) {
        if (this.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        if (selector) {
            let min = Number.POSITIVE_INFINITY;
            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min);
            }
            return min;
        }
        else {
            return Math.min.apply(null, this);
        }
    }
    minAsync(selector) {
        return Enumerable.minAsync(this, selector);
    }
    ofType(type) {
        return Enumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return Enumerable.orderBy(this, predicate, comparer);
    }
    orderByAsync(predicate, comparer) {
        return Enumerable.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return Enumerable.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return Enumerable.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        super.reverse();
        return this;
    }
    select(keyOrSelector) {
        return Enumerable.select(this, keyOrSelector);
    }
    selectAsync(keyOrSelector) {
        return Enumerable.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return Enumerable.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return Enumerable.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return Enumerable.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return Enumerable.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return Enumerable.single(this, predicate);
    }
    singleAsync(predicate) {
        return Enumerable.singleAsync(this, predicate);
    }
    singleOrDefault(predicate) {
        return Enumerable.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return Enumerable.singleOrDefaultAsync(this, predicate);
    }
    skip(count) {
        return Enumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return Enumerable.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return Enumerable.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return Enumerable.sum(this, selector);
    }
    sumAsync(selector) {
        return Enumerable.sumAsync(this, selector);
    }
    take(amount) {
        return Enumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return Enumerable.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return Enumerable.takeWhileAsync(this, predicate);
    }
    toArray() {
        return Enumerable.toArray(this);
    }
    toMap(selector) {
        return Enumerable.toMap(this, selector);
    }
    toMapAsync(selector) {
        return Enumerable.toMapAsync(this, selector);
    }
    toSet() {
        return Enumerable.toSet(this);
    }
    union(second, comparer) {
        return Enumerable.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return Enumerable.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return Enumerable.where(this, predicate);
    }
    whereAsync(predicate) {
        return Enumerable.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return Enumerable.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return Enumerable.zipAsync(this, second, resultSelector);
    }
}
exports.ArrayEnumerable = ArrayEnumerable;
