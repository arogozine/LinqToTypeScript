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
const Enumerable_1 = require("./Enumerable");
/**
 * Array backed Enumerable
 */
class ArrayEnumerable extends Array {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable_1.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return super.every(predicate);
    }
    allAsync(predicate) {
        return Enumerable_1.allAsync(this, predicate);
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
        return Enumerable_1.anyAsync(this, predicate);
    }
    asAsync() {
        return Enumerable_1.asAsync(this);
    }
    asParallel() {
        return parallel_1.ParallelEnumerable.from(0 /* PromiseToArray */, () => __awaiter(this, void 0, void 0, function* () { return this; }));
    }
    average(selector) {
        return Enumerable_1.average(this, selector);
    }
    averageAsync(selector) {
        return Enumerable_1.averageAsync(this, selector);
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
        return Enumerable_1.contains(this, value, comparer);
    }
    containsAsync(value, comparer) {
        return Enumerable_1.containsAsync(this, value, comparer);
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
        return Enumerable_1.countAsync(this, predicate);
    }
    distinct(comparer) {
        return Enumerable_1.distinct(this, comparer);
    }
    distinctAsync(comparer) {
        return Enumerable_1.distinctAsync(this, comparer);
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
        return Enumerable_1.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return Enumerable_1.exceptAsync(this, second, comparer);
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
        return Enumerable_1.firstAsync(this, predicate);
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
        return Enumerable_1.firstOrDefaultAsync(this, predicate);
    }
    each(action) {
        return Enumerable_1.each(this, action);
    }
    eachAsync(action) {
        return Enumerable_1.eachAsync(this, action);
    }
    groupBy(keySelector, comparer) {
        return Enumerable_1.groupBy(this, keySelector, comparer);
    }
    groupByAsync(keySelector, comparer) {
        return Enumerable_1.groupByAsync(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return Enumerable_1.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return Enumerable_1.intersect(this, second, comparer);
    }
    intersectAsync(second, comparer) {
        return Enumerable_1.intersectAsync(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return Enumerable_1.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
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
        return Enumerable_1.lastAsync(this, predicate);
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
        return Enumerable_1.lastOrDefaultAsync(this, predicate);
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
        return Enumerable_1.maxAsync(this, selector);
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
        return Enumerable_1.minAsync(this, selector);
    }
    ofType(type) {
        return Enumerable_1.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return Enumerable_1.orderBy(this, predicate, comparer);
    }
    orderByAsync(predicate, comparer) {
        return Enumerable_1.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return Enumerable_1.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return Enumerable_1.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        super.reverse();
        return this;
    }
    select(keyOrSelector) {
        return Enumerable_1.select(this, keyOrSelector);
    }
    selectAsync(keyOrSelector) {
        return Enumerable_1.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return Enumerable_1.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return Enumerable_1.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return Enumerable_1.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return Enumerable_1.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return Enumerable_1.single(this, predicate);
    }
    singleAsync(predicate) {
        return Enumerable_1.singleAsync(this, predicate);
    }
    singleOrDefault(predicate) {
        return Enumerable_1.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return Enumerable_1.singleOrDefaultAsync(this, predicate);
    }
    skip(count) {
        return Enumerable_1.skip(this, count);
    }
    skipWhile(predicate) {
        return Enumerable_1.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return Enumerable_1.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return Enumerable_1.sum(this, selector);
    }
    sumAsync(selector) {
        return Enumerable_1.sumAsync(this, selector);
    }
    take(amount) {
        return Enumerable_1.take(this, amount);
    }
    takeWhile(predicate) {
        return Enumerable_1.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return Enumerable_1.takeWhileAsync(this, predicate);
    }
    toArray() {
        return Enumerable_1.toArray(this);
    }
    toMap(selector) {
        return Enumerable_1.toMap(this, selector);
    }
    toMapAsync(selector) {
        return Enumerable_1.toMapAsync(this, selector);
    }
    toSet() {
        return Enumerable_1.toSet(this);
    }
    union(second, comparer) {
        return Enumerable_1.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return Enumerable_1.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return Enumerable_1.where(this, predicate);
    }
    whereAsync(predicate) {
        return Enumerable_1.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return Enumerable_1.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return Enumerable_1.zipAsync(this, second, resultSelector);
    }
}
exports.ArrayEnumerable = ArrayEnumerable;
