"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enumerable = require("./Enumerable");
/**
 * Container for all IEnumerable methods
 * to apply to built in ECMAScript collections
 * and what not
 * @private
 */
class BaseEnumerable {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return Enumerable.all(this, predicate);
    }
    allAsync(predicate) {
        return Enumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return Enumerable.any(this, predicate);
    }
    anyAsync(predicate) {
        return Enumerable.anyAsync(this, predicate);
    }
    asAsync() {
        return Enumerable.asAsync(this);
    }
    asParallel() {
        return Enumerable.asParallel(this);
    }
    average(selector) {
        return Enumerable.average(this, selector);
    }
    averageAsync(selector) {
        return Enumerable.averageAsync(this, selector);
    }
    concat(second) {
        return Enumerable.concat(this, second);
    }
    contains(value, comparer) {
        return Enumerable.contains(this, value, comparer);
    }
    containsAsync(value, comparer) {
        return Enumerable.containsAsync(this, value, comparer);
    }
    count(predicate) {
        return Enumerable.count(this, predicate);
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
        return Enumerable.elementAt(this, index);
    }
    elementAtOrDefault(index) {
        return Enumerable.elementAtOrDefault(this, index);
    }
    except(second, comparer) {
        return Enumerable.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return Enumerable.exceptAsync(this, second, comparer);
    }
    first(predicate) {
        return Enumerable.first(this, predicate);
    }
    firstAsync(predicate) {
        return Enumerable.firstAsync(this, predicate);
    }
    firstOrDefault(predicate) {
        return Enumerable.firstOrDefault(this, predicate);
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
        return Enumerable.last(this, predicate);
    }
    lastAsync(predicate) {
        return Enumerable.lastAsync(this, predicate);
    }
    lastOrDefault(predicate) {
        return Enumerable.lastOrDefault(this, predicate);
    }
    lastOrDefaultAsync(predicate) {
        return Enumerable.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        return Enumerable.max(this, selector);
    }
    maxAsync(selector) {
        return Enumerable.maxAsync(this, selector);
    }
    min(selector) {
        return Enumerable.min(this, selector);
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
        return Enumerable.reverse(this);
    }
    select(keyOrSelector) {
        return Enumerable.select(this, keyOrSelector);
    }
    selectAsync(selector) {
        return Enumerable.selectAsync(this, selector);
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
exports.BaseEnumerable = BaseEnumerable;
