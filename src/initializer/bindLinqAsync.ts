import { IAsyncEnumerable, IEqualityComparer, IPrototype } from "../types"

import { aggregate } from "./../async/_private/aggregate"
import { all } from "./../async/_private/all"
import { allAsync } from "./../async/_private/allAsync"
import { any } from "./../async/_private/any"
import { anyAsync } from "./../async/_private/anyAsync"
import { asParallel } from "./../async/_private/asParallel"
import { average } from "./../async/_private/average"
import { averageAsync } from "./../async/_private/averageAsync"
import { concat } from "./../async/_private/concat"
import { contains } from "./../async/_private/contains"
import { containsAsync } from "./../async/_private/containsAsync"
import { count } from "./../async/_private/count"
import { countAsync } from "./../async/_private/countAsync"
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
import { toSet } from "./../async/_private/toSet"
import { union } from "./../async/_private/union"
import { unionAsync } from "./../async/_private/unionAsync"
import { where } from "./../async/_private/where"
import { whereAsync } from "./../async/_private/whereAsync"
import { zip } from "./../async/_private/zip"
import { zipAsync } from "./../async/_private/zipAsync"

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */

/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export const bindLinqAsync = <T, Y extends AsyncIterable<T>>(object: IPrototype<Y>) => {

    const prototype = object.prototype as IAsyncEnumerable<T>

    const bind = (func: (x: IAsyncEnumerable<T>, ...params: any[]) => any, key: keyof IAsyncEnumerable<T>) => {
        switch (func.length) {
            case 1:
                prototype[key] = function(this: IAsyncEnumerable<T>) {
                    return func(this)
                } as any
                return
            case 2:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any) {
                    return func(this, a)
                } as any
                return
            case 3:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any, b: any) {
                    return func(this, a, b)
                } as any
                return
            case 4:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any, b: any, c: any) {
                    return func(this, a, b, c)
                } as any
                return
            case 5:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any, b: any, c: any, d: any) {
                    return func(this, a, b, c, d)
                } as any
                return
            default:
                throw new Error("Invalid Function")
        }
    }

    bind(aggregate, "aggregate")
    bind(all, "all")
    bind(allAsync, "allAsync")
    bind(any, "any")
    bind(anyAsync, "anyAsync")
    // bind(asAsync, "asAsync")
    bind(asParallel, "asParallel")
    bind(average, "average")
    bind(averageAsync, "averageAsync")
    bind(concat, "concat")
    prototype.contains = function(value: T, comparer?: IEqualityComparer<T>) {
        return contains(this, value, comparer)
    }
    bind(containsAsync, "containsAsync")
    bind(count, "count")
    bind(countAsync, "countAsync")
    prototype.distinct = function(comparer?: IEqualityComparer<T>) {
        return distinct(this, comparer)
    }
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
    prototype.intersect = function(second: IAsyncEnumerable<T>, comparer?: IEqualityComparer<T>) {
        return intersect(this, second, comparer)
    }
    bind(intersectAsync, "intersectAsync")
    prototype.joinByKey = function<TInner, TKey, TResult>(
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: T) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: T, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>) {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer)
    }
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
    bind(reverse, "reverse")
    bind(select, "select")
    bind(selectAsync, "selectAsync")
    bind(selectMany, "selectMany")
    bind(selectManyAsync, "selectManyAsync")
    prototype.sequenceEquals = function(second: IAsyncEnumerable<T>, comparer?: IEqualityComparer<T>) {
        return sequenceEquals(this, second, comparer)
    }
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
    bind(toSet, "toSet")
    bind(union, "union")
    bind(unionAsync, "unionAsync")
    bind(where, "where")
    bind(whereAsync, "whereAsync")
    bind(zip, "zip")
    bind(zipAsync, "zipAsync")
}
