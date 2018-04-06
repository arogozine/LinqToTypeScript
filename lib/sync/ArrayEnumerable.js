"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("./../shared/shared");
const BasicEnumerable_1 = require("./BasicEnumerable");
const Enumerable_1 = require("./Enumerable");
class ArrayEnumerable extends Array {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable_1.Enumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return super.every(predicate);
    }
    allAsync(predicate) {
        return Enumerable_1.Enumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return this.some(predicate || (() => true));
    }
    anyAsync(predicate) {
        return Enumerable_1.Enumerable.anyAsync(this, predicate);
    }
    average(selector) {
        return Enumerable_1.Enumerable.average(this, selector);
    }
    averageAsync(selector) {
        return Enumerable_1.Enumerable.averageAsync(this, selector);
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
        return Enumerable_1.Enumerable.contains(this, value, comparer);
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
        return Enumerable_1.Enumerable.countAsync(this, predicate);
    }
    distinct(comparer) {
        return Enumerable_1.Enumerable.distinct(this, comparer);
    }
    elementAt(index) {
        if (index >= this.length) {
            throw new shared_1.ArgumentOutOfRangeException("index");
        }
        return this[index];
    }
    elementAtOrDefault(index) {
        return Enumerable_1.Enumerable.elementAtOrDefault(this, index);
    }
    except(second, comparer) {
        return Enumerable_1.Enumerable.except(this, second, comparer);
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
        return Enumerable_1.Enumerable.firstAsync(this, predicate);
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
        return Enumerable_1.Enumerable.firstOrDefaultAsync(this, predicate);
    }
    each(action) {
        return Enumerable_1.Enumerable.each(this, action);
    }
    eachAsync(action) {
        return Enumerable_1.Enumerable.eachAsync(this, action);
    }
    groupBy(keySelector, comparer) {
        return Enumerable_1.Enumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return Enumerable_1.Enumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return Enumerable_1.Enumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return Enumerable_1.Enumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
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
        return Enumerable_1.Enumerable.lastAsync(this, predicate);
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
        return Enumerable_1.Enumerable.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        if (this.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        if (selector) {
            let max = Number.MIN_VALUE;
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
        return Enumerable_1.Enumerable.maxAsync(this, selector);
    }
    min(selector) {
        if (this.length === 0) {
            throw new shared_1.InvalidOperationException(shared_1.ErrorString.NoElements);
        }
        if (selector) {
            let min = Number.MAX_VALUE;
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
        return Enumerable_1.Enumerable.minAsync(this, selector);
    }
    ofType(type) {
        return Enumerable_1.Enumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return Enumerable_1.Enumerable.orderBy(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return Enumerable_1.Enumerable.orderByDescending(this, predicate, comparer);
    }
    reverse() {
        super.reverse();
        return this;
    }
    select(keyOrSelector) {
        return Enumerable_1.Enumerable.select(this, keyOrSelector);
    }
    selectAsync(keyOrSelector) {
        return Enumerable_1.Enumerable.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return Enumerable_1.Enumerable.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return Enumerable_1.Enumerable.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return Enumerable_1.Enumerable.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return Enumerable_1.Enumerable.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return Enumerable_1.Enumerable.single(this, predicate);
    }
    singleAsync(predicate) {
        return Enumerable_1.Enumerable.singleAsync(this, predicate);
    }
    singleOrDefault(predicate) {
        return Enumerable_1.Enumerable.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return Enumerable_1.Enumerable.singleOrDefaultAsync(this, predicate);
    }
    skip(count) {
        return Enumerable_1.Enumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return Enumerable_1.Enumerable.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return Enumerable_1.Enumerable.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return Enumerable_1.Enumerable.sum(this, selector);
    }
    sumAsync(selector) {
        return Enumerable_1.Enumerable.sumAsync(this, selector);
    }
    take(amount) {
        return Enumerable_1.Enumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return Enumerable_1.Enumerable.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return Enumerable_1.Enumerable.takeWhileAsync(this, predicate);
    }
    toArray() {
        return Enumerable_1.Enumerable.toArray(this);
    }
    toMap(selector) {
        return Enumerable_1.Enumerable.toMap(this, selector);
    }
    toMapAsync(selector) {
        return Enumerable_1.Enumerable.toMapAsync(this, selector);
    }
    toSet() {
        return Enumerable_1.Enumerable.toSet(this);
    }
    union(second, comparer) {
        return Enumerable_1.Enumerable.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return Enumerable_1.Enumerable.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return Enumerable_1.Enumerable.where(this, predicate);
    }
    whereAsync(predicate) {
        return Enumerable_1.Enumerable.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return Enumerable_1.Enumerable.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return Enumerable_1.Enumerable.zipAsync(this, second, resultSelector);
    }
}
exports.ArrayEnumerable = ArrayEnumerable;
