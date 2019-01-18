"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aggregate_1 = require("./_private/aggregate");
const all_1 = require("./_private/all");
const allAsync_1 = require("./_private/allAsync");
const any_1 = require("./_private/any");
const anyAsync_1 = require("./_private/anyAsync");
const asParallel_1 = require("./_private/asParallel");
const average_1 = require("./_private/average");
const averageAsync_1 = require("./_private/averageAsync");
const concat_1 = require("./_private/concat");
const contains_1 = require("./_private/contains");
const containsAsync_1 = require("./_private/containsAsync");
const count_1 = require("./_private/count");
const countAsync_1 = require("./_private/countAsync");
const distinct_1 = require("./_private/distinct");
const distinctAsync_1 = require("./_private/distinctAsync");
const each_1 = require("./_private/each");
const eachAsync_1 = require("./_private/eachAsync");
const elementAt_1 = require("./_private/elementAt");
const elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
const except_1 = require("./_private/except");
const exceptAsync_1 = require("./_private/exceptAsync");
const first_1 = require("./_private/first");
const firstAsync_1 = require("./_private/firstAsync");
const firstOrDefault_1 = require("./_private/firstOrDefault");
const firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
const groupBy_1 = require("./_private/groupBy");
const groupByAsync_1 = require("./_private/groupByAsync");
const groupByWithSel_1 = require("./_private/groupByWithSel");
const intersect_1 = require("./_private/intersect");
const intersectAsync_1 = require("./_private/intersectAsync");
const join_1 = require("./_private/join");
const last_1 = require("./_private/last");
const lastAsync_1 = require("./_private/lastAsync");
const lastOrDefault_1 = require("./_private/lastOrDefault");
const lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
const max_1 = require("./_private/max");
const maxAsync_1 = require("./_private/maxAsync");
const min_1 = require("./_private/min");
const minAsync_1 = require("./_private/minAsync");
const ofType_1 = require("./_private/ofType");
const orderBy_1 = require("./_private/orderBy");
const orderByAsync_1 = require("./_private/orderByAsync");
const orderByDescending_1 = require("./_private/orderByDescending");
const orderByDescendingAsync_1 = require("./_private/orderByDescendingAsync");
const reverse_1 = require("./_private/reverse");
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
    bind(asParallel_1.asParallel);
    bind(average_1.average);
    bind(averageAsync_1.averageAsync);
    bind(concat_1.concat);
    prototype.contains = function (value, comparer) {
        return contains_1.contains(this, value, comparer);
    };
    bind(containsAsync_1.containsAsync);
    bind(count_1.count);
    bind(countAsync_1.countAsync);
    prototype.distinct = function (comparer) {
        return distinct_1.distinct(this, comparer);
    };
    bind(distinctAsync_1.distinctAsync);
    bind(each_1.each);
    bind(eachAsync_1.eachAsync);
    bind(elementAt_1.elementAt);
    bind(elementAtOrDefault_1.elementAtOrDefault);
    bind(except_1.except);
    bind(exceptAsync_1.exceptAsync);
    bind(first_1.first);
    bind(firstAsync_1.firstAsync);
    bind(firstOrDefault_1.firstOrDefault);
    bind(firstOrDefaultAsync_1.firstOrDefaultAsync);
    bind(groupBy_1.groupBy);
    bind(groupByAsync_1.groupByAsync);
    bind(groupByWithSel_1.groupByWithSel);
    prototype.intersect = function (second, comparer) {
        return intersect_1.intersect(this, second, comparer);
    };
    bind(intersectAsync_1.intersectAsync);
    prototype.joinByKey = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        return join_1.join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
    };
    bind(last_1.last);
    bind(lastAsync_1.lastAsync);
    bind(lastOrDefault_1.lastOrDefault);
    bind(lastOrDefaultAsync_1.lastOrDefaultAsync);
    bind(max_1.max);
    bind(maxAsync_1.maxAsync);
    bind(min_1.min);
    bind(minAsync_1.minAsync);
    bind(ofType_1.ofType);
    bind(orderBy_1.orderBy);
    bind(orderByAsync_1.orderByAsync);
    bind(orderByDescending_1.orderByDescending);
    bind(orderByDescendingAsync_1.orderByDescendingAsync);
    bind(reverse_1.reverse);
    bind(select_1.select);
    bind(selectAsync_1.selectAsync);
    bind(selectMany_1.selectMany);
    bind(selectManyAsync_1.selectManyAsync);
    prototype.sequenceEquals = function (second, comparer) {
        return sequenceEquals_1.sequenceEquals(this, second, comparer);
    };
    bind(sequenceEqualsAsync_1.sequenceEqualsAsync);
    bind(single_1.single);
    bind(singleAsync_1.singleAsync);
    bind(singleOrDefault_1.singleOrDefault);
    bind(singleOrDefaultAsync_1.singleOrDefaultAsync);
    bind(skip_1.skip);
    bind(skipWhile_1.skipWhile);
    bind(skipWhileAsync_1.skipWhileAsync);
    bind(sum_1.sum);
    bind(sumAsync_1.sumAsync);
    bind(take_1.take);
    bind(takeWhile_1.takeWhile);
    bind(takeWhileAsync_1.takeWhileAsync);
    bind(toArray_1.toArray);
    bind(toMap_1.toMap);
    bind(toMapAsync_1.toMapAsync);
    bind(toSet_1.toSet);
    bind(union_1.union);
    bind(unionAsync_1.unionAsync);
    bind(where_1.where);
    bind(whereAsync_1.whereAsync);
    bind(zip_1.zip);
    bind(zipAsync_1.zipAsync);
}
exports.bindLinqAsync = bindLinqAsync;
