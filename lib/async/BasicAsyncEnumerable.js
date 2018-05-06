"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncEnumerable_1 = require("./AsyncEnumerable");
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
        return AsyncEnumerable_1.AsyncEnumerable.asParallel(this);
    }
    aggregate(seedOrFunc, func, resultSelector) {
        return AsyncEnumerable_1.AsyncEnumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.all(this, predicate);
    }
    allAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.any(this, predicate);
    }
    anyAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.anyAsync(this, predicate);
    }
    average(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.average(this, selector);
    }
    averageAsync(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.averageAsync(this, selector);
    }
    concat(second) {
        return AsyncEnumerable_1.AsyncEnumerable.concat(this, second);
    }
    contains(value, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.contains(this, value, comparer);
    }
    count(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.count(this, predicate);
    }
    countAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.countAsync(this, predicate);
    }
    distinct(comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.distinct(this, comparer);
    }
    elementAt(index) {
        return AsyncEnumerable_1.AsyncEnumerable.elementAt(this, index);
    }
    elementAtOrDefault(index) {
        return AsyncEnumerable_1.AsyncEnumerable.elementAtOrDefault(this, index);
    }
    each(action) {
        return AsyncEnumerable_1.AsyncEnumerable.each(this, action);
    }
    eachAsync(action) {
        return AsyncEnumerable_1.AsyncEnumerable.eachAsync(this, action);
    }
    except(second, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.except(this, second, comparer);
    }
    first(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.first(this, predicate);
    }
    firstAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.firstAsync(this, predicate);
    }
    firstOrDefault(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.firstOrDefault(this, predicate);
    }
    firstOrDefaultAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.firstOrDefaultAsync(this, predicate);
    }
    groupBy(keySelector, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.groupBy(this, keySelector, comparer);
    }
    groupByWithSel(keySelector, elementSelector, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.groupByWithSel(this, keySelector, elementSelector, comparer);
    }
    intersect(second, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.intersect(this, second, comparer);
    }
    joinByKey(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    }
    last(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.last(this, predicate);
    }
    lastAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.lastAsync(this, predicate);
    }
    lastOrDefault(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.lastOrDefault(this, predicate);
    }
    lastOrDefaultAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.max(this, selector);
    }
    maxAsync(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.maxAsync(this, selector);
    }
    min(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.min(this, selector);
    }
    minAsync(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.minAsync(this, selector);
    }
    ofType(type) {
        return AsyncEnumerable_1.AsyncEnumerable.ofType(this, type);
    }
    orderBy(predicate, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.orderBy(this, predicate, comparer);
    }
    orderByAsync(predicate, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        return AsyncEnumerable_1.AsyncEnumerable.reverse(this);
    }
    select(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.select(this, selector);
    }
    selectAsync(keyOrSelector) {
        return AsyncEnumerable_1.AsyncEnumerable.selectAsync(this, keyOrSelector);
    }
    selectMany(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.selectMany(this, selector);
    }
    selectManyAsync(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.selectManyAsync(this, selector);
    }
    sequenceEquals(second, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.sequenceEquals(this, second, comparer);
    }
    sequenceEqualsAsync(second, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.sequenceEqualsAsync(this, second, comparer);
    }
    single(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.single(this, predicate);
    }
    singleAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.singleAsync(this, predicate);
    }
    singleOrDefault(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.singleOrDefault(this, predicate);
    }
    singleOrDefaultAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.singleOrDefaultAsync(this, predicate);
    }
    skip(count) {
        return AsyncEnumerable_1.AsyncEnumerable.skip(this, count);
    }
    skipWhile(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.skipWhile(this, predicate);
    }
    skipWhileAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.skipWhileAsync(this, predicate);
    }
    sum(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.sum(this, selector);
    }
    sumAsync(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.sumAsync(this, selector);
    }
    take(amount) {
        return AsyncEnumerable_1.AsyncEnumerable.take(this, amount);
    }
    takeWhile(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.takeWhile(this, predicate);
    }
    takeWhileAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.takeWhileAsync(this, predicate);
    }
    toArray() {
        return AsyncEnumerable_1.AsyncEnumerable.toArray(this);
    }
    toMap(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.toMap(this, selector);
    }
    toMapAsync(selector) {
        return AsyncEnumerable_1.AsyncEnumerable.toMapAsync(this, selector);
    }
    toSet() {
        return AsyncEnumerable_1.AsyncEnumerable.toSet(this);
    }
    union(second, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.union(this, second, comparer);
    }
    unionAsync(second, comparer) {
        return AsyncEnumerable_1.AsyncEnumerable.unionAsync(this, second, comparer);
    }
    where(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.where(this, predicate);
    }
    whereAsync(predicate) {
        return AsyncEnumerable_1.AsyncEnumerable.whereAsync(this, predicate);
    }
    zip(second, resultSelector) {
        return AsyncEnumerable_1.AsyncEnumerable.zip(this, second, resultSelector);
    }
    zipAsync(second, resultSelector) {
        return AsyncEnumerable_1.AsyncEnumerable.zipAsync(this, second, resultSelector);
    }
    [Symbol.asyncIterator]() {
        return this.iterator();
    }
}
exports.BasicAsyncEnumerable = BasicAsyncEnumerable;
