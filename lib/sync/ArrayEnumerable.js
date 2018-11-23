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
const ArgumentOutOfRangeException_1 = require("../shared/ArgumentOutOfRangeException");
const ErrorString_1 = require("../shared/ErrorString");
const InvalidOperationException_1 = require("../shared/InvalidOperationException");
const aggregate_1 = require("./_private/aggregate");
const allAsync_1 = require("./_private/allAsync");
const anyAsync_1 = require("./_private/anyAsync");
const asAsync_1 = require("./_private/asAsync");
const average_1 = require("./_private/average");
const averageAsync_1 = require("./_private/averageAsync");
const contains_1 = require("./_private/contains");
const containsAsync_1 = require("./_private/containsAsync");
const countAsync_1 = require("./_private/countAsync");
const distinct_1 = require("./_private/distinct");
const distinctAsync_1 = require("./_private/distinctAsync");
const each_1 = require("./_private/each");
const eachAsync_1 = require("./_private/eachAsync");
const except_1 = require("./_private/except");
const exceptAsync_1 = require("./_private/exceptAsync");
const firstAsync_1 = require("./_private/firstAsync");
const firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
const groupBy_1 = require("./_private/groupBy");
const groupByAsync_1 = require("./_private/groupByAsync");
const groupByWithSel_1 = require("./_private/groupByWithSel");
const intersect_1 = require("./_private/intersect");
const intersectAsync_1 = require("./_private/intersectAsync");
const join_1 = require("./_private/join");
const lastAsync_1 = require("./_private/lastAsync");
const lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
const maxAsync_1 = require("./_private/maxAsync");
const minAsync_1 = require("./_private/minAsync");
const ofType_1 = require("./_private/ofType");
const orderBy_1 = require("./_private/orderBy");
const orderByAsync_1 = require("./_private/orderByAsync");
const orderByDescending_1 = require("./_private/orderByDescending");
const orderByDescendingAsync_1 = require("./_private/orderByDescendingAsync");
const select_1 = require("./_private/select");
const selectAsync_1 = require("./_private/selectAsync");
const selectMany_1 = require("./_private/selectMany");
const selectManyAsync_1 = require("./_private/selectManyAsync");
const sequenceEquals_1 = require("./_private/sequenceEquals");
const sequenceEqualsAsync_1 = require("./_private/sequenceEqualsAsync");
const single_1 = require("./_private/single");
const singleAsync_1 = require("./_private/singleAsync");
const singleOrDefault_1 = require("./_private/singleOrDefault");
const singleOrDefaultAsync_1 = require("./_private/singleOrDefaultAsync");
const skip_1 = require("./_private/skip");
const skipWhile_1 = require("./_private/skipWhile");
const skipWhileAsync_1 = require("./_private/skipWhileAsync");
const sum_1 = require("./_private/sum");
const sumAsync_1 = require("./_private/sumAsync");
const take_1 = require("./_private/take");
const takeWhile_1 = require("./_private/takeWhile");
const takeWhileAsync_1 = require("./_private/takeWhileAsync");
const toArray_1 = require("./_private/toArray");
const toMap_1 = require("./_private/toMap");
const toMapAsync_1 = require("./_private/toMapAsync");
const toSet_1 = require("./_private/toSet");
const union_1 = require("./_private/union");
const unionAsync_1 = require("./_private/unionAsync");
const where_1 = require("./_private/where");
const whereAsync_1 = require("./_private/whereAsync");
const zip_1 = require("./_private/zip");
const zipAsync_1 = require("./_private/zipAsync");
const BasicEnumerable_1 = require("./BasicEnumerable");
/**
 * Array backed Enumerable
 */
class ArrayEnumerable extends Array {
    aggregate(seedOrFunc, func, resultSelector) {
        return aggregate_1.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return super.every(predicate);
    }
    allAsync(predicate) {
        return allAsync_1.allAsync(this, predicate);
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
        return anyAsync_1.anyAsync(this, predicate);
    }
    asAsync() {
        return asAsync_1.asAsync(this);
    }
    asParallel() {
        return parallel_1.from(0 /* PromiseToArray */, () => __awaiter(this, void 0, void 0, function* () { return this; }));
    }
    average(selector) {
        return average_1.average(this, selector);
    }
    averageAsync(selector) {
        return averageAsync_1.averageAsync(this, selector);
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
        return contains_1.contains(this, value, comparer);
    }
    containsAsync(value, comparer) {
        return containsAsync_1.containsAsync(this, value, comparer);
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
        return countAsync_1.countAsync(this, predicate);
    }
    distinct(comparer) {
        return distinct_1.distinct(this, comparer);
    }
    distinctAsync(comparer) {
        return distinctAsync_1.distinctAsync(this, comparer);
    }
    elementAt(index) {
        if (index < 0 || index >= this.length) {
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
        }
        return this[index];
    }
    elementAtOrDefault(index) {
        return this[index] || null;
    }
    except(second, comparer) {
        return except_1.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return exceptAsync_1.exceptAsync(this, second, comparer);
    }
    first(predicate) {
        if (predicate) {
            const value = this.find(predicate);
            if (value === undefined) {
                throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
            }
            else {
                return value;
            }
        }
        else {
            if (this.length === 0) {
                throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
            }
            return this[0];
        }
    }
    firstAsync(predicate) {
        return firstAsync_1.firstAsync(this, predicate);
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
        return firstOrDefaultAsync_1.firstOrDefaultAsync(this, predicate);
    }
    each(action) {
        return each_1.each(this, action);
    }
    eachAsync(action) {
        return eachAsync_1.eachAsync(this, action);
    }
    groupBy(keySelector, comparer) {
        return groupBy_1.groupBy(this, keySelector, comparer);
    }
    groupByAsync(keySelector, comparer) {
        return groupByAsync_1.groupByAsync(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return groupByWithSel_1.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return intersect_1.intersect(this, second, comparer);
    }
    intersectAsync(second, comparer) {
        return intersectAsync_1.intersectAsync(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return join_1.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i];
                if (predicate(value) === true) {
                    return value;
                }
            }
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoMatch);
        }
        else {
            if (this.length === 0) {
                throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
            }
            return this[this.length - 1];
        }
    }
    lastAsync(predicate) {
        return lastAsync_1.lastAsync(this, predicate);
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
        return lastOrDefaultAsync_1.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        if (this.length === 0) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
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
        return maxAsync_1.maxAsync(this, selector);
    }
    min(selector) {
        if (this.length === 0) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
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
        return minAsync_1.minAsync(this, selector);
    }
    ofType(type) {
        return ofType_1.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return orderBy_1.orderBy(this, predicate, comparer);
    }
    orderByAsync(predicate, comparer) {
        return orderByAsync_1.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return orderByDescending_1.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return orderByDescendingAsync_1.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        super.reverse();
        return this;
    }
    select(keyOrSelector) {
        return select_1.select(this, keyOrSelector);
    }
    selectAsync(keyOrSelector) {
        return selectAsync_1.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return selectMany_1.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return selectManyAsync_1.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return sequenceEquals_1.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return sequenceEqualsAsync_1.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return single_1.single(this, predicate);
    }
    singleAsync(predicate) {
        return singleAsync_1.singleAsync(this, predicate);
    }
    singleOrDefault(predicate) {
        return singleOrDefault_1.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return singleOrDefaultAsync_1.singleOrDefaultAsync(this, predicate);
    }
    skip(count) {
        return skip_1.skip(this, count);
    }
    skipWhile(predicate) {
        return skipWhile_1.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return skipWhileAsync_1.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return sum_1.sum(this, selector);
    }
    sumAsync(selector) {
        return sumAsync_1.sumAsync(this, selector);
    }
    take(amount) {
        return take_1.take(this, amount);
    }
    takeWhile(predicate) {
        return takeWhile_1.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return takeWhileAsync_1.takeWhileAsync(this, predicate);
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
        return union_1.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return unionAsync_1.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return where_1.where(this, predicate);
    }
    whereAsync(predicate) {
        return whereAsync_1.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return zip_1.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return zipAsync_1.zipAsync(this, second, resultSelector);
    }
}
exports.ArrayEnumerable = ArrayEnumerable;
