import { IAsyncEnumerable, IEqualityComparer, IPrototype } from "../types"

import {
    asParallel,
    concat,
    distinct, distinctAsync,
    each, eachAsync, except, exceptAsync,
    groupBy, groupByAsync, groupByWithSel,
    intersect, intersectAsync,
    join,
    ofType, orderBy, orderByAsync, orderByDescending, orderByDescendingAsync,
    reverse,
    select, selectAsync, selectMany, selectManyAsync, // , sequenceEquals, sequenceEqualsAsync,
    skip, skipWhile, skipWhileAsync,
    take, takeWhile, takeWhileAsync,
    union, unionAsync,
    where, whereAsync,
    zip, zipAsync,
} from "./AsyncEnumerable"

import { aggregate } from "./_private/aggregate"
import { all } from "./_private/all"
import { allAsync } from "./_private/allAsync"
import { any } from "./_private/any"
import { anyAsync } from "./_private/anyAsync"
// import { asParallel } from "./_private/asParallel"
import { average } from "./_private/average"
import { averageAsync } from "./_private/averageAsync"
// import { concat } from "./_private/concat"
import { contains } from "./_private/contains"
import { containsAsync } from "./_private/containsAsync"
import { count } from "./_private/count"
import { countAsync } from "./_private/countAsync"
// import { distinct } from "./_private/distinct"
// import { distinctAsync } from "./_private/distinctAsync"
// import { each } from "./_private/each"
// import { eachAsync } from "./_private/eachAsync"
import { elementAt } from "./_private/elementAt"
import { elementAtOrDefault } from "./_private/elementAtOrDefault"
// import { except } from "./_private/except"
// import { exceptAsync } from "./_private/exceptAsync"
import { first } from "./_private/first"
import { firstAsync } from "./_private/firstAsync"
import { firstOrDefault } from "./_private/firstOrDefault"
import { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"
// import { groupBy } from "./_private/groupBy"
// import { groupByAsync } from "./_private/groupByAsync"
// import { groupByWithSel } from "./_private/groupByWithSel"
// import { intersect } from "./_private/intersect"
// import { intersectAsync } from "./_private/intersectAsync"
// import { join } from "./_private/join"
import { last } from "./_private/last"
import { lastAsync } from "./_private/lastAsync"
import { lastOrDefault } from "./_private/lastOrDefault"
import { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"
import { max } from "./_private/max"
import { maxAsync } from "./_private/maxAsync"
import { min } from "./_private/min"
import { minAsync } from "./_private/minAsync"
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
import { sequenceEquals } from "./_private/sequenceEquals"
import { sequenceEqualsAsync } from "./_private/sequenceEqualsAsync"
import { single } from "./_private/single"
import { singleAsync } from "./_private/singleAsync"
import { singleOrDefault } from "./_private/singleOrDefault"
import { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"
// import { skip } from "./_private/skip"
// import { skipWhile } from "./_private/skipWhile"
// import { skipWhileAsync } from "./_private/skipWhileAsync"
import { sum } from "./_private/sum"
import { sumAsync } from "./_private/sumAsync"
// import { take } from "./_private/take"
// import { takeWhile } from "./_private/takeWhile"
// import { takeWhileAsync } from "./_private/takeWhileAsync"
import { toArray } from "./_private/toArray"
import { toMap } from "./_private/toMap"
import { toMapAsync } from "./_private/toMapAsync"
import { toSet } from "./_private/toSet"
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
export function bindLinqAsync<T, Y extends AsyncIterable<T>>(object: IPrototype<Y>): void {

    const prototype = object.prototype as IAsyncEnumerable<T>

    const bind = (func: (x: IAsyncEnumerable<T>, ...params: any[]) => any, optKey?: keyof IAsyncEnumerable<T>) => {
        const key = optKey || func.name as keyof IAsyncEnumerable<T>
        switch (func.length) {
            case 1:
                prototype[key] = function(this: IAsyncEnumerable<T>) {
                    return func(this)
                }
                return
            case 2:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any) {
                    return func(this, a)
                }
                return
            case 3:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any, b: any) {
                    return func(this, a, b)
                }
                return
            case 4:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any, b: any, c: any) {
                    return func(this, a, b, c)
                }
                return
            case 5:
                prototype[key] = function(this: IAsyncEnumerable<T>, a: any, b: any, c: any, d: any) {
                    return func(this, a, b, c, d)
                }
                return
            default:
                throw new Error("Invalid Function")
        }
    }

    bind(aggregate)
    bind(all)
    bind(allAsync)
    bind(any)
    bind(anyAsync)
    // bind(asAsync, "asAsync")
    bind(asParallel)
    bind(average)
    bind(averageAsync)
    bind(concat)
    prototype.contains = function(value: T, comparer?: IEqualityComparer<T>) {
        return contains(this, value, comparer)
    }
    bind(containsAsync)
    bind(count)
    bind(countAsync)
    prototype.distinct = function(comparer?: IEqualityComparer<T>) {
        return distinct(this, comparer)
    }
    bind(distinctAsync)
    bind(each)
    bind(eachAsync)
    bind(elementAt)
    bind(elementAtOrDefault)
    bind(except)
    bind(exceptAsync)
    bind(first)
    bind(firstAsync)
    bind(firstOrDefault)
    bind(firstOrDefaultAsync)
    bind(groupBy)
    bind(groupByAsync)
    bind(groupByWithSel)
    prototype.intersect = function(second: IAsyncEnumerable<T>, comparer?: IEqualityComparer<T>) {
        return intersect(this, second, comparer)
    }
    bind(intersectAsync)
    prototype.joinByKey = function<TInner, TKey, TResult>(
        inner: IAsyncEnumerable<TInner>,
        outerKeySelector: (x: T) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: T, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>) {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer)
    }
    bind(last)
    bind(lastAsync)
    bind(lastOrDefault)
    bind(lastOrDefaultAsync)
    bind(max)
    bind(maxAsync)
    bind(min)
    bind(minAsync)
    bind(ofType)
    bind(orderBy)
    bind(orderByAsync)
    bind(orderByDescending)
    bind(orderByDescendingAsync)
    bind(reverse)
    bind(select)
    bind(selectAsync)
    bind(selectMany)
    bind(selectManyAsync)
    prototype.sequenceEquals = function(second: IAsyncEnumerable<T>, comparer?: IEqualityComparer<T>) {
        return sequenceEquals(this, second, comparer)
    }
    bind(sequenceEqualsAsync)
    bind(single)
    bind(singleAsync)
    bind(singleOrDefault)
    bind(singleOrDefaultAsync)
    bind(skip)
    bind(skipWhile)
    bind(skipWhileAsync)
    bind(sum)
    bind(sumAsync)
    bind(take)
    bind(takeWhile)
    bind(takeWhileAsync)
    bind(toArray)
    bind(toMap)
    bind(toMapAsync)
    bind(toSet)
    bind(union)
    bind(unionAsync)
    bind(where)
    bind(whereAsync)
    bind(zip)
    bind(zipAsync)
}
