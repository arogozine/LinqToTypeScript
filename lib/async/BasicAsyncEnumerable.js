"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncEnumerable = require("./AsyncEnumerable");
/**
 * The class behind IAsyncEnumerable<T>
 * @private
 */
class BasicAsyncEnumerable {
    constructor(iterator) {
        this.iterator = iterator;
        //
    }
    asParallel() {
        return AsyncEnumerable.asParallel(this);
    }
    aggregate(seedOrFunc, func, resultSelector) {
        return AsyncEnumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return AsyncEnumerable.all(this, predicate);
    }
    allAsync(predicate) {
        return AsyncEnumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return AsyncEnumerable.any(this, predicate);
    }
    anyAsync(predicate) {
        return AsyncEnumerable.anyAsync(this, predicate);
    }
    average(selector) {
        return AsyncEnumerable.average(this, selector);
    }
    averageAsync(selector) {
        return AsyncEnumerable.averageAsync(this, selector);
    }
    concat(second) {
        return AsyncEnumerable.concat(this, second);
    }
    contains(value, comparer) {
        return AsyncEnumerable.contains(this, value, comparer);
    }
    containsAsync(value, comparer) {
        return AsyncEnumerable.containsAsync(this, value, comparer);
    }
    count(predicate) {
        return AsyncEnumerable.count(this, predicate);
    }
    countAsync(predicate) {
        return AsyncEnumerable.countAsync(this, predicate);
    }
    distinct(comparer) {
        return AsyncEnumerable.distinct(this, comparer);
    }
    distinctAsync(comparer) {
        return AsyncEnumerable.distinctAsync(this, comparer);
    }
    elementAt(index) {
        return AsyncEnumerable.elementAt(this, index);
    }
    elementAtOrDefault(index) {
        return AsyncEnumerable.elementAtOrDefault(this, index);
    }
    each(action) {
        return AsyncEnumerable.each(this, action);
    }
    eachAsync(action) {
        return AsyncEnumerable.eachAsync(this, action);
    }
    except(second, comparer) {
        return AsyncEnumerable.except(this, second, comparer);
    }
    exceptAsync(second, comparer) {
        return AsyncEnumerable.exceptAsync(this, second, comparer);
    }
    first(predicate) {
        return AsyncEnumerable.first(this, predicate);
    }
    firstAsync(predicate) {
        return AsyncEnumerable.firstAsync(this, predicate);
    }
    firstOrDefault(predicate) {
        return AsyncEnumerable.firstOrDefault(this, predicate);
    }
    firstOrDefaultAsync(predicate) {
        return AsyncEnumerable.firstOrDefaultAsync(this, predicate);
    }
    groupBy(keySelector, comparer) {
        return AsyncEnumerable.groupBy(this, keySelector, comparer);
    }
    groupByAsync(keySelector, comparer) {
        return AsyncEnumerable.groupByAsync(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return AsyncEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return AsyncEnumerable.intersect(this, second, comparer);
    }
    intersectAsync(second, comparer) {
        return AsyncEnumerable.intersectAsync(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return AsyncEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return AsyncEnumerable.last(this, predicate);
    }
    lastAsync(predicate) {
        return AsyncEnumerable.lastAsync(this, predicate);
    }
    lastOrDefault(predicate) {
        return AsyncEnumerable.lastOrDefault(this, predicate);
    }
    lastOrDefaultAsync(predicate) {
        return AsyncEnumerable.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        return AsyncEnumerable.max(this, selector);
    }
    maxAsync(selector) {
        return AsyncEnumerable.maxAsync(this, selector);
    }
    min(selector) {
        return AsyncEnumerable.min(this, selector);
    }
    minAsync(selector) {
        return AsyncEnumerable.minAsync(this, selector);
    }
    ofType(type) {
        return AsyncEnumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return AsyncEnumerable.orderBy(this, predicate, comparer);
    }
    orderByAsync(predicate, comparer) {
        return AsyncEnumerable.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return AsyncEnumerable.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return AsyncEnumerable.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        return AsyncEnumerable.reverse(this);
    }
    select(selector) {
        return AsyncEnumerable.select(this, selector);
    }
    selectAsync(keyOrSelector) {
        return AsyncEnumerable.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return AsyncEnumerable.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return AsyncEnumerable.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return AsyncEnumerable.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return AsyncEnumerable.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return AsyncEnumerable.single(this, predicate);
    }
    singleAsync(predicate) {
        return AsyncEnumerable.singleAsync(this, predicate);
    }
    singleOrDefault(predicate) {
        return AsyncEnumerable.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return AsyncEnumerable.singleOrDefaultAsync(this, predicate);
    }
    skip(count) {
        return AsyncEnumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return AsyncEnumerable.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return AsyncEnumerable.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return AsyncEnumerable.sum(this, selector);
    }
    sumAsync(selector) {
        return AsyncEnumerable.sumAsync(this, selector);
    }
    take(amount) {
        return AsyncEnumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return AsyncEnumerable.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return AsyncEnumerable.takeWhileAsync(this, predicate);
    }
    toArray() {
        return AsyncEnumerable.toArray(this);
    }
    toMap(selector) {
        return AsyncEnumerable.toMap(this, selector);
    }
    toMapAsync(selector) {
        return AsyncEnumerable.toMapAsync(this, selector);
    }
    toSet() {
        return AsyncEnumerable.toSet(this);
    }
    union(second, comparer) {
        return AsyncEnumerable.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return AsyncEnumerable.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return AsyncEnumerable.where(this, predicate);
    }
    whereAsync(predicate) {
        return AsyncEnumerable.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return AsyncEnumerable.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return AsyncEnumerable.zipAsync(this, second, resultSelector);
    }
    [Symbol.asyncIterator]() {
        return this.iterator();
    }
}
exports.BasicAsyncEnumerable = BasicAsyncEnumerable;
