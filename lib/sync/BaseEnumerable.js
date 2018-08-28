"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enumerable_1 = require("./Enumerable");
/**
 * Container for all IEnumerable methods
 * to apply to built in ECMAScript collections
 * and what not
 * @private
 */
class BaseEnumerable {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable_1.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return Enumerable_1.all(this, predicate);
    }
    allAsync(predicate) {
        return Enumerable_1.allAsync(this, predicate);
    }
    any(predicate) {
        return Enumerable_1.any(this, predicate);
    }
    anyAsync(predicate) {
        return Enumerable_1.anyAsync(this, predicate);
    }
    asAsync() {
        return Enumerable_1.asAsync(this);
    }
    asParallel() {
        return Enumerable_1.asParallel(this);
    }
    average(selector) {
        return Enumerable_1.average(this, selector);
    }
    averageAsync(selector) {
        return Enumerable_1.averageAsync(this, selector);
    }
    concat(second) {
        return Enumerable_1.concat(this, second);
    }
    contains(value, comparer) {
        return Enumerable_1.contains(this, value, comparer);
    }
    containsAsync(value, comparer) {
        return Enumerable_1.containsAsync(this, value, comparer);
    }
    count(predicate) {
        return Enumerable_1.count(this, predicate);
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
        return Enumerable_1.elementAt(this, index);
    }
    elementAtOrDefault(index) {
        return Enumerable_1.elementAtOrDefault(this, index);
    }
    except(second, comparer) {
        return Enumerable_1.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return Enumerable_1.exceptAsync(this, second, comparer);
    }
    first(predicate) {
        return Enumerable_1.first(this, predicate);
    }
    firstAsync(predicate) {
        return Enumerable_1.firstAsync(this, predicate);
    }
    firstOrDefault(predicate) {
        return Enumerable_1.firstOrDefault(this, predicate);
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
        return Enumerable_1.last(this, predicate);
    }
    lastAsync(predicate) {
        return Enumerable_1.lastAsync(this, predicate);
    }
    lastOrDefault(predicate) {
        return Enumerable_1.lastOrDefault(this, predicate);
    }
    lastOrDefaultAsync(predicate) {
        return Enumerable_1.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        return Enumerable_1.max(this, selector);
    }
    maxAsync(selector) {
        return Enumerable_1.maxAsync(this, selector);
    }
    min(selector) {
        return Enumerable_1.min(this, selector);
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
        return Enumerable_1.reverse(this);
    }
    select(keyOrSelector) {
        return Enumerable_1.select(this, keyOrSelector);
    }
    selectAsync(selector) {
        return Enumerable_1.selectAsync(this, selector);
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
exports.BaseEnumerable = BaseEnumerable;
