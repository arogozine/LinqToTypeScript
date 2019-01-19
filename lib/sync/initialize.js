"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aggregate_1 = require("./_private/aggregate");
const allAsync_1 = require("./_private/allAsync");
const anyAsync_1 = require("./_private/anyAsync");
const asAsync_1 = require("./_private/asAsync");
const asParallel_1 = require("./_private/asParallel");
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
const ArgumentOutOfRangeException_1 = require("../shared/ArgumentOutOfRangeException");
const ErrorString_1 = require("../shared/ErrorString");
const InvalidOperationException_1 = require("../shared/InvalidOperationException");
const ArrayEnumerable_1 = require("./ArrayEnumerable");
const BasicEnumerable_1 = require("./BasicEnumerable");
const bindLinq_1 = require("./bindLinq");
// tslint:disable:completed-docs
/**
 * @private
 */
function initializeTypes() {
    const prototype = ArrayEnumerable_1.ArrayEnumerable.prototype;
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
    prototype.all = function (predicate) {
        return this.every(predicate);
    };
    bind(allAsync_1.allAsync);
    prototype.any = function (predicate) {
        if (predicate) {
            return this.some(predicate);
        }
        else {
            return this.length !== 0;
        }
    };
    bind(anyAsync_1.anyAsync);
    // TODO - Browsers not naming arrow functions properly
    bind(asAsync_1.asAsync, "asAsync");
    bind(asParallel_1.asParallel);
    bind(average_1.average);
    bind(averageAsync_1.averageAsync);
    prototype.concat = function () {
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
            return Array.prototype.concat.apply(this, [items]);
        }
    }; // TODO
    prototype.contains = function (value, comparer) {
        return contains_1.contains(this, value, comparer);
    };
    bind(containsAsync_1.containsAsync);
    prototype.count = function (predicate) {
        if (predicate) {
            // tslint:disable-next-line:no-shadowed-variable
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
    };
    bind(countAsync_1.countAsync);
    prototype.distinct = function (comparer) {
        return distinct_1.distinct(this, comparer);
    };
    bind(distinctAsync_1.distinctAsync);
    bind(each_1.each);
    bind(eachAsync_1.eachAsync);
    prototype.elementAt = function (index) {
        if (index < 0 || index >= this.length) {
            throw new ArgumentOutOfRangeException_1.ArgumentOutOfRangeException("index");
        }
        return this[index];
    };
    prototype.elementAtOrDefault = function (index) {
        return this[index] || null;
    };
    bind(except_1.except);
    bind(exceptAsync_1.exceptAsync);
    prototype.first = function (predicate) {
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
    };
    bind(firstAsync_1.firstAsync);
    prototype.firstOrDefault = function (predicate) {
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
    };
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
    prototype.last = function (predicate) {
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
    };
    bind(lastAsync_1.lastAsync);
    prototype.lastOrDefault = function (predicate) {
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
    };
    bind(lastOrDefaultAsync_1.lastOrDefaultAsync);
    prototype.max = function (selector) {
        if (this.length === 0) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        if (selector) {
            // tslint:disable-next-line:no-shadowed-variable
            let max = Number.NEGATIVE_INFINITY;
            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max);
            }
            return max;
        }
        else {
            return Math.max.apply(null, this);
        }
    };
    bind(maxAsync_1.maxAsync);
    prototype.min = function (selector) {
        if (this.length === 0) {
            throw new InvalidOperationException_1.InvalidOperationException(ErrorString_1.ErrorString.NoElements);
        }
        if (selector) {
            // tslint:disable-next-line:no-shadowed-variable
            let min = Number.POSITIVE_INFINITY;
            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min);
            }
            return min;
        }
        else {
            return Math.min.apply(null, this);
        }
    };
    bind(minAsync_1.minAsync);
    bind(ofType_1.ofType);
    bind(orderBy_1.orderBy);
    bind(orderByAsync_1.orderByAsync);
    bind(orderByDescending_1.orderByDescending);
    bind(orderByDescendingAsync_1.orderByDescendingAsync);
    prototype.reverse = function () {
        Array.prototype.reverse.apply(this);
        return this;
    };
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
    bindLinq_1.bindLinq(BasicEnumerable_1.BasicEnumerable);
}
exports.initializeTypes = initializeTypes;
