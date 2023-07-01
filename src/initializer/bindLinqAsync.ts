import { IAsyncEnumerable, IPrototype } from "../types"

import { aggregate } from "./../async/_private/aggregate"
import { all } from "./../async/_private/all"
import { allAsync } from "./../async/_private/allAsync"
import { append } from "../async/_private/append"
import { any } from "./../async/_private/any"
import { anyAsync } from "./../async/_private/anyAsync"
import { asParallel } from "./../async/_private/asParallel"
import { average } from "./../async/_private/average"
import { averageAsync } from "./../async/_private/averageAsync"
import { chunk } from "./../async/_private/chunk"
import { concatenate } from "../async/_private/concatenate"
import { contains } from "./../async/_private/contains"
import { containsAsync } from "./../async/_private/containsAsync"
import { count } from "./../async/_private/count"
import { countAsync } from "./../async/_private/countAsync"
import { defaultIfEmpty } from "../async/_private/defaultIfEmpty"
import { distinct } from "./../async/_private/distinct"
import { distinctAsync } from "./../async/_private/distinctAsync"
import { each } from "./../async/_private/each"
import { eachAsync } from "./../async/_private/eachAsync"
import { elementAt } from "./../async/_private/elementAt"
import { elementAtOrDefault } from "./../async/_private/elementAtOrDefault"
import { except } from "./../async/_private/except"
import { exceptAsync } from "./../async/_private/exceptAsync"
import { first } from "./../async/_private/first"
import { firstAsync } from "./../async/_private/firstAsync"
import { firstOrDefault } from "./../async/_private/firstOrDefault"
import { firstOrDefaultAsync } from "./../async/_private/firstOrDefaultAsync"
import { groupBy } from "./../async/_private/groupBy"
import { groupByAsync } from "./../async/_private/groupByAsync"
import { groupByWithSel } from "./../async/_private/groupByWithSel"
import { groupJoin } from "./../async/_private/groupJoin"
import { groupJoinAsync } from "./../async/_private/groupJoinAsync"
import { intersect } from "./../async/_private/intersect"
import { intersectAsync } from "./../async/_private/intersectAsync"
import { join } from "./../async/_private/join"
import { last } from "./../async/_private/last"
import { lastAsync } from "./../async/_private/lastAsync"
import { lastOrDefault } from "./../async/_private/lastOrDefault"
import { lastOrDefaultAsync } from "./../async/_private/lastOrDefaultAsync"
import { max } from "./../async/_private/max"
import { maxAsync } from "./../async/_private/maxAsync"
import { min } from "./../async/_private/min"
import { minAsync } from "./../async/_private/minAsync"
import { ofType } from "./../async/_private/ofType"
import { orderBy } from "./../async/_private/orderBy"
import { orderByAsync } from "./../async/_private/orderByAsync"
import { orderByDescending } from "./../async/_private/orderByDescending"
import { orderByDescendingAsync } from "./../async/_private/orderByDescendingAsync"
import { partition } from "./../async/_private/partition"
import { partitionAsync } from "./../async/_private/partitionAsync"
import { prepend } from "../async/_private/prepend"
import { reverse } from "./../async/_private/reverse"
import { select } from "./../async/_private/select"
import { selectAsync } from "./../async/_private/selectAsync"
import { selectMany } from "./../async/_private/selectMany"
import { selectManyAsync } from "./../async/_private/selectManyAsync"
import { sequenceEquals } from "./../async/_private/sequenceEquals"
import { sequenceEqualsAsync } from "./../async/_private/sequenceEqualsAsync"
import { single } from "./../async/_private/single"
import { singleAsync } from "./../async/_private/singleAsync"
import { singleOrDefault } from "./../async/_private/singleOrDefault"
import { singleOrDefaultAsync } from "./../async/_private/singleOrDefaultAsync"
import { skip } from "./../async/_private/skip"
import { skipWhile } from "./../async/_private/skipWhile"
import { skipWhileAsync } from "./../async/_private/skipWhileAsync"
import { sum } from "./../async/_private/sum"
import { sumAsync } from "./../async/_private/sumAsync"
import { take } from "./../async/_private/take"
import { takeWhile } from "./../async/_private/takeWhile"
import { takeWhileAsync } from "./../async/_private/takeWhileAsync"
import { toArray } from "./../async/_private/toArray"
import { toMap } from "./../async/_private/toMap"
import { toMapAsync } from "./../async/_private/toMapAsync"
import { toObject } from "./../async/_private/toObject"
import { toObjectAsync } from "./../async/_private/toObjectAsync"
import { toSet } from "./../async/_private/toSet"
import { union } from "./../async/_private/union"
import { unionAsync } from "./../async/_private/unionAsync"
import { where } from "./../async/_private/where"
import { whereAsync } from "./../async/_private/whereAsync"
import { zip } from "./../async/_private/zip"
import { zipAsync } from "./../async/_private/zipAsync"

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument */

/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export const bindLinqAsync = <T, Y extends AsyncIterable<T>>(object: IPrototype<Y>) => {
    const prototype = object.prototype as IAsyncEnumerable<T>

    const bind = <TKey extends Exclude<keyof IAsyncEnumerable<T>, keyof AsyncIterable<T>>, TParams extends Parameters<IAsyncEnumerable<T>[TKey]>>
        (func: (x: IAsyncEnumerable<T>, ...params: TParams) => ReturnType<IAsyncEnumerable<any>[TKey]>, key: TKey) => {
        const wrapped = function(this: IAsyncEnumerable<any>, ...params: TParams) {
            return func(this, ...params)
        }

        Object.defineProperty(wrapped, "length", { value: func.length - 1 })
        prototype[key] = wrapped as IAsyncEnumerable<T>[TKey]
    }

    bind(aggregate, "aggregate")
    bind(all, "all")
    bind(allAsync, "allAsync")
    bind(append, "append")
    bind(any, "any")
    bind(anyAsync, "anyAsync")
    bind(asParallel, "asParallel")
    bind(average, "average")
    bind(averageAsync, "averageAsync")
    bind(chunk, "chunk")
    bind(concatenate, "concatenate")
    bind(contains, "contains")
    bind(containsAsync, "containsAsync")
    bind(count, "count")
    bind(countAsync, "countAsync")
    bind(defaultIfEmpty, "defaultIfEmpty")
    bind(distinct, "distinct")
    bind(distinctAsync, "distinctAsync")
    bind(each, "each")
    bind(eachAsync, "eachAsync")
    bind(elementAt, "elementAt")
    bind(elementAtOrDefault, "elementAtOrDefault")
    bind(except, "except")
    bind(exceptAsync, "exceptAsync")
    bind(first, "first")
    bind(firstAsync, "firstAsync")
    bind(firstOrDefault, "firstOrDefault")
    bind(firstOrDefaultAsync, "firstOrDefaultAsync")
    bind(groupBy, "groupBy")
    bind(groupByAsync, "groupByAsync")
    bind(groupByWithSel, "groupByWithSel")
    bind(groupJoin, "groupJoin")
    bind(groupJoinAsync, "groupJoinAsync")
    bind(intersect, "intersect")
    bind(intersectAsync, "intersectAsync")
    bind(join, "joinByKey")
    bind(last, "last")
    bind(lastAsync, "lastAsync")
    bind(lastOrDefault, "lastOrDefault")
    bind(lastOrDefaultAsync, "lastOrDefaultAsync")
    bind(max, "max")
    bind(maxAsync, "maxAsync")
    bind(min, "min")
    bind(minAsync, "minAsync")
    bind(ofType, "ofType")
    bind(orderBy, "orderBy")
    bind(orderByAsync, "orderByAsync")
    bind(orderByDescending, "orderByDescending")
    bind(orderByDescendingAsync, "orderByDescendingAsync")
    bind(partition, "partition")
    bind(partitionAsync, "partitionAsync")
    bind(prepend, "prepend")
    bind(reverse, "reverse")
    bind(select, "select")
    bind(selectAsync, "selectAsync")
    bind(selectMany, "selectMany")
    bind(selectManyAsync, "selectManyAsync")
    bind(sequenceEquals, "sequenceEquals")
    bind(sequenceEqualsAsync, "sequenceEqualsAsync")
    bind(single, "single")
    bind(singleAsync, "singleAsync")
    bind(singleOrDefault, "singleOrDefault")
    bind(singleOrDefaultAsync, "singleOrDefaultAsync")
    bind(skip, "skip")
    bind(skipWhile, "skipWhile")
    bind(skipWhileAsync, "skipWhileAsync")
    bind(sum, "sum")
    bind(sumAsync, "sumAsync")
    bind(take, "take")
    bind(takeWhile, "takeWhile")
    bind(takeWhileAsync, "takeWhileAsync")
    bind(toArray, "toArray")
    bind(toMap, "toMap")
    bind(toMapAsync, "toMapAsync")
    bind(toObject, "toObject")
    bind(toObjectAsync, "toObjectAsync")
    bind(toSet, "toSet")
    bind(union, "union")
    bind(unionAsync, "unionAsync")
    bind(where, "where")
    bind(whereAsync, "whereAsync")
    bind(zip, "zip")
    bind(zipAsync, "zipAsync")
}
