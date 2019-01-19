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
const _nextIteration_1 = require("./_private/_nextIteration");
const _nextIterationAsync_1 = require("./_private/_nextIterationAsync");
const _nextIterationWithIndex_1 = require("./_private/_nextIterationWithIndex");
const _nextIterationWithIndexAsync_1 = require("./_private/_nextIterationWithIndexAsync");
const toArray_1 = require("./_private/toArray");
exports.toArray = toArray_1.toArray;
const BasicParallelEnumerable_1 = require("./BasicParallelEnumerable");
const OrderedParallelEnumerable_1 = require("./OrderedParallelEnumerable");
const ParallelEnumerablePrivate = require("./ParallelEnumerablePrivate");
/**
 * Contains static methods to work with Parallel Async
 */
var aggregate_1 = require("./_private/aggregate");
exports.aggregate = aggregate_1.aggregate;
var all_1 = require("./_private/all");
exports.all = all_1.all;
var allAsync_1 = require("./_private//allAsync");
exports.allAsync = allAsync_1.allAsync;
var empty_1 = require("./_private/empty");
exports.empty = empty_1.empty;
var any_1 = require("./_private/any");
exports.any = any_1.any;
var anyAsync_1 = require("./_private/anyAsync");
exports.anyAsync = anyAsync_1.anyAsync;
var asAsync_1 = require("./_private/asAsync");
exports.asAsync = asAsync_1.asAsync;
var average_1 = require("./_private/average");
exports.average = average_1.average;
var averageAsync_1 = require("./_private/averageAsync");
exports.averageAsync = averageAsync_1.averageAsync;
var concat_1 = require("./_private/concat");
exports.concat = concat_1.concat;
var contains_1 = require("./_private/contains");
exports.contains = contains_1.contains;
var containsAsync_1 = require("./_private/containsAsync");
exports.containsAsync = containsAsync_1.containsAsync;
var count_1 = require("./_private/count");
exports.count = count_1.count;
var countAsync_1 = require("./_private/countAsync");
exports.countAsync = countAsync_1.countAsync;
var distinct_1 = require("./_private/distinct");
exports.distinct = distinct_1.distinct;
var distinctAsync_1 = require("./_private/distinctAsync");
exports.distinctAsync = distinctAsync_1.distinctAsync;
var each_1 = require("./_private/each");
exports.each = each_1.each;
var eachAsync_1 = require("./_private/eachAsync");
exports.eachAsync = eachAsync_1.eachAsync;
var elementAt_1 = require("./_private/elementAt");
exports.elementAt = elementAt_1.elementAt;
var elementAtOrDefault_1 = require("./_private/elementAtOrDefault");
exports.elementAtOrDefault = elementAtOrDefault_1.elementAtOrDefault;
var except_1 = require("./_private/except");
exports.except = except_1.except;
var exceptAsync_1 = require("./_private/exceptAsync");
exports.exceptAsync = exceptAsync_1.exceptAsync;
var first_1 = require("./_private/first");
exports.first = first_1.first;
var firstAsync_1 = require("./_private/firstAsync");
exports.firstAsync = firstAsync_1.firstAsync;
var firstOrDefault_1 = require("./_private/firstOrDefault");
exports.firstOrDefault = firstOrDefault_1.firstOrDefault;
var firstOrDefaultAsync_1 = require("./_private/firstOrDefaultAsync");
exports.firstOrDefaultAsync = firstOrDefaultAsync_1.firstOrDefaultAsync;
var flatten_1 = require("./_private/flatten");
exports.flatten = flatten_1.flatten;
var from_1 = require("./_private/from");
exports.from = from_1.from;
function groupBy(source, keySelector, comparer) {
    if (comparer) {
        return ParallelEnumerablePrivate.groupBy_0(source, keySelector, comparer);
    }
    else {
        return ParallelEnumerablePrivate.groupBy_0_Simple(source, keySelector);
    }
}
exports.groupBy = groupBy;
function groupByAsync(source, keySelector, comparer) {
    if (comparer) {
        return ParallelEnumerablePrivate.groupByAsync_0(source, keySelector, comparer);
    }
    else {
        return ParallelEnumerablePrivate.groupByAsync_0_Simple(source, keySelector);
    }
}
exports.groupByAsync = groupByAsync;
function groupByWithSel(source, keySelector, elementSelector, comparer) {
    if (comparer) {
        return ParallelEnumerablePrivate.groupBy_1(source, keySelector, elementSelector, comparer);
    }
    else {
        return ParallelEnumerablePrivate.groupBy_1_Simple(source, keySelector, elementSelector);
    }
}
exports.groupByWithSel = groupByWithSel;
var join_1 = require("./_private/join");
exports.join = join_1.join;
var intersect_1 = require("./_private/intersect");
exports.intersect = intersect_1.intersect;
var intersectAsync_1 = require("./_private/intersectAsync");
exports.intersectAsync = intersectAsync_1.intersectAsync;
var last_1 = require("./_private/last");
exports.last = last_1.last;
var lastAsync_1 = require("./_private/lastAsync");
exports.lastAsync = lastAsync_1.lastAsync;
var lastOrDefault_1 = require("./_private/lastOrDefault");
exports.lastOrDefault = lastOrDefault_1.lastOrDefault;
var lastOrDefaultAsync_1 = require("./_private/lastOrDefaultAsync");
exports.lastOrDefaultAsync = lastOrDefaultAsync_1.lastOrDefaultAsync;
var max_1 = require("./_private/max");
exports.max = max_1.max;
var maxAsync_1 = require("./_private/maxAsync");
exports.maxAsync = maxAsync_1.maxAsync;
var min_1 = require("./_private/min");
exports.min = min_1.min;
var minAsync_1 = require("./_private/minAsync");
exports.minAsync = minAsync_1.minAsync;
function select(source, key) {
    if (typeof key === "function") {
        if (key.length === 1) {
            return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, key));
        }
        else {
            return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIterationWithIndex_1.nextIterationWithIndex(source, key));
        }
    }
    else {
        return new BasicParallelEnumerable_1.BasicParallelEnumerable(_nextIteration_1.nextIteration(source, (x) => x[key]));
    }
}
exports.select = select;
function selectAsync(source, keyOrSelector) {
    let generator;
    if (typeof keyOrSelector === "function") {
        if (keyOrSelector.length === 1) {
            generator = _nextIterationAsync_1.nextIterationAsync(source, keyOrSelector);
        }
        else {
            generator = _nextIterationWithIndexAsync_1.nextIterationWithIndexAsync(source, keyOrSelector);
        }
    }
    else {
        generator = _nextIterationAsync_1.nextIterationAsync(source, (x) => (x[keyOrSelector]));
    }
    return new BasicParallelEnumerable_1.BasicParallelEnumerable(generator);
}
exports.selectAsync = selectAsync;
function selectMany(source, selector) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        let values;
        if (typeof selector === "function") {
            if (selector.length === 1) {
                values = yield _nextIteration_1.nextIteration(source, selector);
            }
            else {
                values = yield _nextIterationWithIndex_1.nextIterationWithIndex(source, selector);
            }
        }
        else {
            values = yield _nextIteration_1.nextIteration(source, (x) => x[selector]);
        }
        const valuesArray = [];
        switch (values.type) {
            case 0 /* PromiseToArray */: {
                for (const outer of yield values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
            case 1 /* ArrayOfPromises */: {
                for (const outer of values.generator()) {
                    for (const y of yield outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
            case 2 /* PromiseOfPromises */: {
                for (const outer of yield values.generator()) {
                    for (const y of yield outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
        }
        return valuesArray;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.selectMany = selectMany;
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
function selectManyAsync(source, selector) {
    const generator = () => __awaiter(this, void 0, void 0, function* () {
        let values;
        if (selector.length === 1) {
            values = yield _nextIterationAsync_1.nextIterationAsync(source, selector);
        }
        else {
            values = yield _nextIterationWithIndexAsync_1.nextIterationWithIndexAsync(source, selector);
        }
        const valuesArray = [];
        switch (values.type) {
            case 0 /* PromiseToArray */: {
                for (const outer of yield values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
            case 1 /* ArrayOfPromises */: {
                for (const outer of values.generator()) {
                    for (const y of yield outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
            case 2 /* PromiseOfPromises */: {
                for (const outer of yield values.generator()) {
                    for (const y of yield outer) {
                        valuesArray.push(y);
                    }
                }
                break;
            }
        }
        return valuesArray;
    });
    return new BasicParallelEnumerable_1.BasicParallelEnumerable({
        generator,
        type: 0 /* PromiseToArray */,
    });
}
exports.selectManyAsync = selectManyAsync;
var ofType_1 = require("./_private/ofType");
exports.ofType = ofType_1.ofType;
/**
 * Sorts the elements of a sequence in ascending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @returns An IOrderedParallelEnumerable<TElement> whose elements are sorted according to a key.
 */
function orderBy(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generate(source, keySelector, true, comparer);
}
exports.orderBy = orderBy;
/**
 * Sorts the elements of a sequence in ascending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @returns An IOrderedParallelEnumerable<TElement> whose elements are sorted according to a key.
 */
function orderByAsync(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generateAsync(source, keySelector, true, comparer);
}
exports.orderByAsync = orderByAsync;
/**
 * Sorts the elements of a sequence in descending order by using a specified or default comparer.
 * @param source A sequence of values to order.
 * @param keySelector A function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys. Optional.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
function orderByDescending(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generate(source, keySelector, false, comparer);
}
exports.orderByDescending = orderByDescending;
/**
 * Sorts the elements of a sequence in descending order by using a specified comparer.
 * @param source A sequence of values to order.
 * @param keySelector An async function to extract a key from an element.
 * @param comparer An IComparer<T> to compare keys.
 * @return An IOrderedParallelEnumerable<TElement> whose elements are sorted in descending order according to a key.
 */
function orderByDescendingAsync(source, keySelector, comparer) {
    return OrderedParallelEnumerable_1.OrderedParallelEnumerable.generateAsync(source, keySelector, false, comparer);
}
exports.orderByDescendingAsync = orderByDescendingAsync;
var partition_1 = require("./_private/partition");
exports.partition = partition_1.partition;
var partitionAsync_1 = require("./_private/partitionAsync");
exports.partitionAsync = partitionAsync_1.partitionAsync;
var range_1 = require("./_private/range");
exports.range = range_1.range;
var repeat_1 = require("./_private/repeat");
exports.repeat = repeat_1.repeat;
var reverse_1 = require("./_private/reverse");
exports.reverse = reverse_1.reverse;
var sequenceEquals_1 = require("./_private/sequenceEquals");
exports.sequenceEquals = sequenceEquals_1.sequenceEquals;
var sequenceEqualsAsync_1 = require("./_private/sequenceEqualsAsync");
exports.sequenceEqualsAsync = sequenceEqualsAsync_1.sequenceEqualsAsync;
var single_1 = require("./_private/single");
exports.single = single_1.single;
var singleAsync_1 = require("./_private/singleAsync");
exports.singleAsync = singleAsync_1.singleAsync;
var singleOrDefault_1 = require("./_private/singleOrDefault");
exports.singleOrDefault = singleOrDefault_1.singleOrDefault;
var singleOrDefaultAsync_1 = require("./_private/singleOrDefaultAsync");
exports.singleOrDefaultAsync = singleOrDefaultAsync_1.singleOrDefaultAsync;
var skip_1 = require("./_private/skip");
exports.skip = skip_1.skip;
var skipWhile_1 = require("./_private/skipWhile");
exports.skipWhile = skipWhile_1.skipWhile;
var skipWhileAsync_1 = require("./_private/skipWhileAsync");
exports.skipWhileAsync = skipWhileAsync_1.skipWhileAsync;
var sum_1 = require("./_private/sum");
exports.sum = sum_1.sum;
var sumAsync_1 = require("./_private/sumAsync");
exports.sumAsync = sumAsync_1.sumAsync;
var take_1 = require("./_private/take");
exports.take = take_1.take;
var takeWhile_1 = require("./_private/takeWhile");
exports.takeWhile = takeWhile_1.takeWhile;
var takeWhileAsync_1 = require("./_private/takeWhileAsync");
exports.takeWhileAsync = takeWhileAsync_1.takeWhileAsync;
var toMap_1 = require("./_private/toMap");
exports.toMap = toMap_1.toMap;
var toMapAsync_1 = require("./_private/toMapAsync");
exports.toMapAsync = toMapAsync_1.toMapAsync;
var toObject_1 = require("./_private/toObject");
exports.toObject = toObject_1.toObject;
var toSet_1 = require("./_private/toSet");
exports.toSet = toSet_1.toSet;
var union_1 = require("./_private/union");
exports.union = union_1.union;
var unionAsync_1 = require("./_private/unionAsync");
exports.unionAsync = unionAsync_1.unionAsync;
var where_1 = require("./_private/where");
exports.where = where_1.where;
var whereAsync_1 = require("./_private/whereAsync");
exports.whereAsync = whereAsync_1.whereAsync;
var zip_1 = require("./_private/zip");
exports.zip = zip_1.zip;
var zipAsync_1 = require("./_private/zipAsync");
exports.zipAsync = zipAsync_1.zipAsync;
