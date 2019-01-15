"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AsyncEnumerable_1 = require("./AsyncEnumerable");
const aggregate_1 = require("./_private/aggregate");
const all_1 = require("./_private/all");
const allAsync_1 = require("./_private/allAsync");
const any_1 = require("./_private/any");
const anyAsync_1 = require("./_private/anyAsync");
// import { asParallel } from "./_private/asParallel"
const average_1 = require("./_private/average");
const averageAsync_1 = require("./_private/averageAsync");
// import { concat } from "./_private/concat"
const contains_1 = require("./_private/contains");
const containsAsync_1 = require("./_private/containsAsync");
const count_1 = require("./_private/count");
const countAsync_1 = require("./_private/countAsync");
// import { distinct } from "./_private/distinct"
// import { distinctAsync } from "./_private/distinctAsync"
// import { each } from "./_private/each"
// import { eachAsync } from "./_private/eachAsync"
const elementAt_1 = require("./_private/elementAt");
const elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
// import { except } from "./_private/except"
// import { exceptAsync } from "./_private/exceptAsync"
const first_1 = require("./_private/first");
const firstAsync_1 = require("./_private/firstAsync");
const firstOrDefault_1 = require("./_private/firstOrDefault");
const firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
// import { groupBy } from "./_private/groupBy"
// import { groupByAsync } from "./_private/groupByAsync"
// import { groupByWithSel } from "./_private/groupByWithSel"
// import { intersect } from "./_private/intersect"
// import { intersectAsync } from "./_private/intersectAsync"
// import { join } from "./_private/join"
const last_1 = require("./_private/last");
const lastAsync_1 = require("./_private/lastAsync");
const lastOrDefault_1 = require("./_private/lastOrDefault");
const lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
const max_1 = require("./_private/max");
const maxAsync_1 = require("./_private/maxAsync");
const min_1 = require("./_private/min");
const minAsync_1 = require("./_private/minAsync");
// import { ofType } from "./_private/ofType"
// import { orderBy } from "./_private/orderBy"
// import { orderByAsync } from "./_private/orderByAsync"
// import { orderByDescending } from "./_private/orderByDescending"
// import { orderByDescendingAsync } from "./_private/orderByDescendingAsync"
// import { reverse } from "./_private/reverse"
// import { select } from "./_private/select"
// import { selectAsync } from "./_private/selectAsync"
// import { selectMany } from "./_private/selectMany"
// import { selectManyAsync } from "./_private/selectManyAsync"
const sequenceEquals_1 = require("./_private/sequenceEquals");
const sequenceEqualsAsync_1 = require("./_private/sequenceEqualsAsync");
const single_1 = require("./_private/single");
const singleAsync_1 = require("./_private/singleAsync");
const singleOrDefault_1 = require("./_private/singleOrDefault");
const singleOrDefaultAsync_1 = require("./_private/singleOrDefaultAsync");
// import { skip } from "./_private/skip"
// import { skipWhile } from "./_private/skipWhile"
// import { skipWhileAsync } from "./_private/skipWhileAsync"
const sum_1 = require("./_private/sum");
const sumAsync_1 = require("./_private/sumAsync");
// import { take } from "./_private/take"
// import { takeWhile } from "./_private/takeWhile"
// import { takeWhileAsync } from "./_private/takeWhileAsync"
const toArray_1 = require("./_private/toArray");
const toMap_1 = require("./_private/toMap");
const toMapAsync_1 = require("./_private/toMapAsync");
const toSet_1 = require("./_private/toSet");
// import { union } from "./_private/union"
// import { unionAsync } from "./_private/unionAsync"
// import { where } from "./_private/where"
// import { whereAsync } from "./_private/whereAsync"
// import { zip } from "./_private/zip"
// import { zipAsync } from "./_private/zipAsync"
/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
function bindLinqAsync(object) {
    const prototype = object.prototype;
    const bind = (func, optKey) => {
        const key = optKey || func.name;
        switch (func.length) {
            case 1:
                prototype[key] = function () {
                    return func(this);
                };
                return;
            case 2:
                prototype[key] = function (a) {
                    return func(this, a);
                };
                return;
            case 3:
                prototype[key] = function (a, b) {
                    return func(this, a, b);
                };
                return;
            case 4:
                prototype[key] = function (a, b, c) {
                    return func(this, a, b, c);
                };
                return;
            case 5:
                prototype[key] = function (a, b, c, d) {
                    return func(this, a, b, c, d);
                };
                return;
            default:
                throw new Error("Invalid Function");
        }
    };
    bind(aggregate_1.aggregate);
    bind(all_1.all);
    bind(allAsync_1.allAsync);
    bind(any_1.any);
    bind(anyAsync_1.anyAsync);
    // bind(asAsync, "asAsync")
    bind(AsyncEnumerable_1.asParallel);
    bind(average_1.average);
    bind(averageAsync_1.averageAsync);
    bind(AsyncEnumerable_1.concat);
    prototype.contains = function (value, comparer) {
        return contains_1.contains(this, value, comparer);
    };
    bind(containsAsync_1.containsAsync);
    bind(count_1.count);
    bind(countAsync_1.countAsync);
    prototype.distinct = function (comparer) {
        return AsyncEnumerable_1.distinct(this, comparer);
    };
    bind(AsyncEnumerable_1.distinctAsync);
    bind(AsyncEnumerable_1.each);
    bind(AsyncEnumerable_1.eachAsync);
    bind(elementAt_1.elementAt);
    bind(elementAtOrDefault_1.elementAtOrDefault);
    bind(AsyncEnumerable_1.except);
    bind(AsyncEnumerable_1.exceptAsync);
    bind(first_1.first);
    bind(firstAsync_1.firstAsync);
    bind(firstOrDefault_1.firstOrDefault);
    bind(firstOrDefaultAsync_1.firstOrDefaultAsync);
    bind(AsyncEnumerable_1.groupBy);
    bind(AsyncEnumerable_1.groupByAsync);
    bind(AsyncEnumerable_1.groupByWithSel);
    prototype.intersect = function (second, comparer) {
        return AsyncEnumerable_1.intersect(this, second, comparer);
    };
    bind(AsyncEnumerable_1.intersectAsync);
    prototype.joinByKey = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return AsyncEnumerable_1.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    };
    bind(last_1.last);
    bind(lastAsync_1.lastAsync);
    bind(lastOrDefault_1.lastOrDefault);
    bind(lastOrDefaultAsync_1.lastOrDefaultAsync);
    bind(max_1.max);
    bind(maxAsync_1.maxAsync);
    bind(min_1.min);
    bind(minAsync_1.minAsync);
    bind(AsyncEnumerable_1.ofType);
    bind(AsyncEnumerable_1.orderBy);
    bind(AsyncEnumerable_1.orderByAsync);
    bind(AsyncEnumerable_1.orderByDescending);
    bind(AsyncEnumerable_1.orderByDescendingAsync);
    bind(AsyncEnumerable_1.reverse);
    bind(AsyncEnumerable_1.select);
    bind(AsyncEnumerable_1.selectAsync);
    bind(AsyncEnumerable_1.selectMany);
    bind(AsyncEnumerable_1.selectManyAsync);
    prototype.sequenceEquals = function (second, comparer) {
        return sequenceEquals_1.sequenceEquals(this, second, comparer);
    };
    bind(sequenceEqualsAsync_1.sequenceEqualsAsync);
    bind(single_1.single);
    bind(singleAsync_1.singleAsync);
    bind(singleOrDefault_1.singleOrDefault);
    bind(singleOrDefaultAsync_1.singleOrDefaultAsync);
    bind(AsyncEnumerable_1.skip);
    bind(AsyncEnumerable_1.skipWhile);
    bind(AsyncEnumerable_1.skipWhileAsync);
    bind(sum_1.sum);
    bind(sumAsync_1.sumAsync);
    bind(AsyncEnumerable_1.take);
    bind(AsyncEnumerable_1.takeWhile);
    bind(AsyncEnumerable_1.takeWhileAsync);
    bind(toArray_1.toArray);
    bind(toMap_1.toMap);
    bind(toMapAsync_1.toMapAsync);
    bind(toSet_1.toSet);
    bind(AsyncEnumerable_1.union);
    bind(AsyncEnumerable_1.unionAsync);
    bind(AsyncEnumerable_1.where);
    bind(AsyncEnumerable_1.whereAsync);
    bind(AsyncEnumerable_1.zip);
    bind(AsyncEnumerable_1.zipAsync);
}
exports.bindLinqAsync = bindLinqAsync;
