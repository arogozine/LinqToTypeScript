"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sync_1 = require("./sync");
const aggregate_1 = require("./_private/aggregate");
const all_1 = require("./_private/all");
const allAsync_1 = require("./_private/allAsync");
const any_1 = require("./_private/any");
const anyAsync_1 = require("./_private/anyAsync");
const average_1 = require("./_private/average");
const averageAsync_1 = require("./_private/averageAsync");
const contains_1 = require("./_private/contains");
const containsAsync_1 = require("./_private/containsAsync");
const count_1 = require("./_private/count");
const countAsync_1 = require("./_private/countAsync");
const elementAt_1 = require("./_private/elementAt");
const elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
const first_1 = require("./_private/first");
const firstAsync_1 = require("./_private/firstAsync");
const firstOrDefault_1 = require("./_private/firstOrDefault");
const firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
const last_1 = require("./_private/last");
const lastAsync_1 = require("./_private/lastAsync");
const lastOrDefault_1 = require("./_private/lastOrDefault");
const lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
const max_1 = require("./_private/max");
const maxAsync_1 = require("./_private/maxAsync");
const min_1 = require("./_private/min");
const minAsync_1 = require("./_private/minAsync");
const single_1 = require("./_private/single");
const singleAsync_1 = require("./_private/singleAsync");
const singleOrDefault_1 = require("./_private/singleOrDefault");
const singleOrDefaultAsync_1 = require("./_private/singleOrDefaultAsync");
const sum_1 = require("./_private/sum");
const sumAsync_1 = require("./_private/sumAsync");
const toArray_1 = require("./_private/toArray");
const toMap_1 = require("./_private/toMap");
const toMapAsync_1 = require("./_private/toMapAsync");
const toSet_1 = require("./_private/toSet");
const Enumerable_1 = require("./Enumerable");
/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
function bindLinq(object) {
    const { prototype } = object;
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
    // TODO - Browsers not naming arrow functions properly
    bind(Enumerable_1.asAsync, "asAsync");
    bind(Enumerable_1.asParallel);
    bind(average_1.average);
    bind(averageAsync_1.averageAsync);
    bind(Enumerable_1.concat);
    bind(contains_1.contains);
    bind(containsAsync_1.containsAsync);
    bind(count_1.count);
    bind(countAsync_1.countAsync);
    bind(Enumerable_1.distinct);
    bind(Enumerable_1.distinctAsync);
    bind(Enumerable_1.each);
    bind(Enumerable_1.eachAsync);
    bind(elementAt_1.elementAt);
    bind(elementAtOrDefault_1.elementAtOrDefault);
    bind(Enumerable_1.except);
    bind(Enumerable_1.exceptAsync);
    bind(first_1.first);
    bind(firstAsync_1.firstAsync);
    bind(firstOrDefault_1.firstOrDefault);
    bind(firstOrDefaultAsync_1.firstOrDefaultAsync);
    bind(Enumerable_1.groupBy);
    bind(Enumerable_1.groupByAsync);
    bind(Enumerable_1.groupByWithSel);
    bind(Enumerable_1.intersect);
    bind(Enumerable_1.intersectAsync);
    bind(Enumerable_1.join, "joinByKey");
    bind(last_1.last);
    bind(lastAsync_1.lastAsync);
    bind(lastOrDefault_1.lastOrDefault);
    bind(lastOrDefaultAsync_1.lastOrDefaultAsync);
    bind(max_1.max);
    bind(maxAsync_1.maxAsync);
    bind(min_1.min);
    bind(minAsync_1.minAsync);
    bind(Enumerable_1.ofType);
    bind(Enumerable_1.orderBy);
    bind(Enumerable_1.orderByAsync);
    bind(Enumerable_1.orderByDescending);
    bind(Enumerable_1.orderByDescendingAsync);
    bind(Enumerable_1.reverse);
    bind(Enumerable_1.select);
    bind(Enumerable_1.selectAsync);
    bind(Enumerable_1.selectMany);
    bind(Enumerable_1.selectManyAsync);
    bind(Enumerable_1.sequenceEquals);
    bind(Enumerable_1.sequenceEqualsAsync);
    bind(single_1.single);
    bind(singleAsync_1.singleAsync);
    bind(singleOrDefault_1.singleOrDefault);
    bind(singleOrDefaultAsync_1.singleOrDefaultAsync);
    bind(Enumerable_1.skip);
    bind(Enumerable_1.skipWhile);
    bind(Enumerable_1.skipWhileAsync);
    bind(sum_1.sum);
    bind(sumAsync_1.sumAsync);
    bind(Enumerable_1.take);
    bind(Enumerable_1.takeWhile);
    bind(Enumerable_1.takeWhileAsync);
    bind(toArray_1.toArray);
    bind(toMap_1.toMap);
    bind(toMapAsync_1.toMapAsync);
    bind(toSet_1.toSet);
    bind(Enumerable_1.union);
    bind(Enumerable_1.unionAsync);
    bind(Enumerable_1.where);
    bind(Enumerable_1.whereAsync);
    bind(Enumerable_1.zip);
    bind(Enumerable_1.zipAsync);
}
exports.bindLinq = bindLinq;
/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
function bindArray(jsArray) {
    const propertyNames = Object.getOwnPropertyNames(sync_1.ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor");
    for (const prop of propertyNames) {
        jsArray.prototype[prop] = jsArray.prototype[prop] || sync_1.ArrayEnumerable.prototype[prop];
    }
}
exports.bindArray = bindArray;
