"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enumerable_1 = require("./Enumerable");
/**
 * Container for all IEnumerable methods
 * to apply to built in ECMAScript collections
 * and what not
 */
class BaseEnumerable {
    aggregate(seedOrFunc, func, resultSelector) {
        return Enumerable_1.Enumerable.aggregate(this, seedOrFunc, func, resultSelector);
    }
    all(predicate) {
        return Enumerable_1.Enumerable.all(this, predicate);
    }
    allAsync(predicate) {
        return Enumerable_1.Enumerable.allAsync(this, predicate);
    }
    any(predicate) {
        return Enumerable_1.Enumerable.any(this, predicate);
    }
    anyAsync(predicate) {
        return Enumerable_1.Enumerable.anyAsync(this, predicate);
    }
    asAsync() {
        return Enumerable_1.Enumerable.asAsync(this);
    }
    asParallel() {
        return Enumerable_1.Enumerable.asParallel(this);
    }
    average(selector) {
        return Enumerable_1.Enumerable.average(this, selector);
    }
    averageAsync(selector) {
        return Enumerable_1.Enumerable.averageAsync(this, selector);
    }
    concat(second) {
        return Enumerable_1.Enumerable.concat(this, second);
    }
    contains(value, comparer) {
        return Enumerable_1.Enumerable.contains(this, value, comparer);
    }
    count(predicate) {
        return Enumerable_1.Enumerable.count(this, predicate);
    }
    countAsync(predicate) {
        return Enumerable_1.Enumerable.countAsync(this, predicate);
    }
    distinct(comparer) {
        return Enumerable_1.Enumerable.distinct(this, comparer);
    }
    elementAt(index) {
        return Enumerable_1.Enumerable.elementAt(this, index);
    }
    elementAtOrDefault(index) {
        return Enumerable_1.Enumerable.elementAtOrDefault(this, index);
    }
    except(second, comparer) {
        return Enumerable_1.Enumerable.except(this, second, comparer);
    }
    first(predicate) {
        return Enumerable_1.Enumerable.first(this, predicate);
    }
    firstAsync(predicate) {
        return Enumerable_1.Enumerable.firstAsync(this, predicate);
    }
    firstOrDefault(predicate) {
        return Enumerable_1.Enumerable.firstOrDefault(this, predicate);
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
        return Enumerable_1.Enumerable.last(this, predicate);
    }
    lastAsync(predicate) {
        return Enumerable_1.Enumerable.lastAsync(this, predicate);
    }
    lastOrDefault(predicate) {
        return Enumerable_1.Enumerable.lastOrDefault(this, predicate);
    }
    lastOrDefaultAsync(predicate) {
        return Enumerable_1.Enumerable.lastOrDefaultAsync(this, predicate);
    }
    max(selector) {
        return Enumerable_1.Enumerable.max(this, selector);
    }
    maxAsync(selector) {
        return Enumerable_1.Enumerable.maxAsync(this, selector);
    }
    min(selector) {
        return Enumerable_1.Enumerable.min(this, selector);
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
    orderByAsync(predicate, comparer) {
        return Enumerable_1.Enumerable.orderByAsync(this, predicate, comparer);
    }
    orderByDescending(predicate, comparer) {
        return Enumerable_1.Enumerable.orderByDescending(this, predicate, comparer);
    }
    orderByDescendingAsync(predicate, comparer) {
        return Enumerable_1.Enumerable.orderByDescendingAsync(this, predicate, comparer);
    }
    reverse() {
        return Enumerable_1.Enumerable.reverse(this);
    }
    select(keyOrSelector) {
        return Enumerable_1.Enumerable.select(this, keyOrSelector);
    }
    selectAsync(selector) {
        return Enumerable_1.Enumerable.selectAsync(this, selector);
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
exports.BaseEnumerable = BaseEnumerable;
