import { IEnumerable, IPrototype } from "../types"

import { aggregate } from "./../sync/_private/aggregate"
import { all } from "./../sync/_private/all"
import { allAsync } from "./../sync/_private/allAsync"
import { any } from "./../sync/_private/any"
import { anyAsync } from "./../sync/_private/anyAsync"
import { asAsync } from "./../sync/_private/asAsync"
import { asParallel } from "./../sync/_private/asParallel"
import { average } from "./../sync/_private/average"
import { averageAsync } from "./../sync/_private/averageAsync"
import { concatenate } from "../sync/_private/concatenate"
import { contains } from "./../sync/_private/contains"
import { containsAsync } from "./../sync/_private/containsAsync"
import { count } from "./../sync/_private/count"
import { countAsync } from "./../sync/_private/countAsync"
import { distinct } from "./../sync/_private/distinct"
import { distinctAsync } from "./../sync/_private/distinctAsync"
import { each } from "./../sync/_private/each"
import { eachAsync } from "./../sync/_private/eachAsync"
import { elementAt } from "./../sync/_private/elementAt"
import { elementAtOrDefault } from "./../sync/_private/elementAtOrDefault"
import { except } from "./../sync/_private/except"
import { exceptAsync } from "./../sync/_private/exceptAsync"
import { first } from "./../sync/_private/first"
import { firstAsync } from "./../sync/_private/firstAsync"
import { firstOrDefault } from "./../sync/_private/firstOrDefault"
import { firstOrDefaultAsync } from "./../sync/_private/firstOrDefaultAsync"
import { groupBy } from "./../sync/_private/groupBy"
import { groupByAsync } from "./../sync/_private/groupByAsync"
import { groupByWithSel } from "./../sync/_private/groupByWithSel"
import { intersect } from "./../sync/_private/intersect"
import { intersectAsync } from "./../sync/_private/intersectAsync"
import { join } from "./../sync/_private/join"
import { last } from "./../sync/_private/last"
import { lastAsync } from "./../sync/_private/lastAsync"
import { lastOrDefault } from "./../sync/_private/lastOrDefault"
import { lastOrDefaultAsync } from "./../sync/_private/lastOrDefaultAsync"
import { max } from "./../sync/_private/max"
import { maxAsync } from "./../sync/_private/maxAsync"
import { min } from "./../sync/_private/min"
import { minAsync } from "./../sync/_private/minAsync"
import { ofType } from "./../sync/_private/ofType"
import { orderBy } from "./../sync/_private/orderBy"
import { orderByAsync } from "./../sync/_private/orderByAsync"
import { orderByDescending } from "./../sync/_private/orderByDescending"
import { orderByDescendingAsync } from "./../sync/_private/orderByDescendingAsync"
import { reverse } from "./../sync/_private/reverse"
import { select } from "./../sync/_private/select"
import { selectAsync } from "./../sync/_private/selectAsync"
import { selectMany } from "./../sync/_private/selectMany"
import { selectManyAsync } from "./../sync/_private/selectManyAsync"
import { sequenceEquals } from "./../sync/_private/sequenceEquals"
import { sequenceEqualsAsync } from "./../sync/_private/sequenceEqualsAsync"
import { single } from "./../sync/_private/single"
import { singleAsync } from "./../sync/_private/singleAsync"
import { singleOrDefault } from "./../sync/_private/singleOrDefault"
import { singleOrDefaultAsync } from "./../sync/_private/singleOrDefaultAsync"
import { skip } from "./../sync/_private/skip"
import { skipWhile } from "./../sync/_private/skipWhile"
import { skipWhileAsync } from "./../sync/_private/skipWhileAsync"
import { sum } from "./../sync/_private/sum"
import { sumAsync } from "./../sync/_private/sumAsync"
import { take } from "./../sync/_private/take"
import { takeWhile } from "./../sync/_private/takeWhile"
import { takeWhileAsync } from "./../sync/_private/takeWhileAsync"
import { toArray } from "./../sync/_private/toArray"
import { toMap } from "./../sync/_private/toMap"
import { toMapAsync } from "./../sync/_private/toMapAsync"
import { toSet } from "./../sync/_private/toSet"
import { union } from "./../sync/_private/union"
import { unionAsync } from "./../sync/_private/unionAsync"
import { where } from "./../sync/_private/where"
import { whereAsync } from "./../sync/_private/whereAsync"
import { zip } from "./../sync/_private/zip"
import { zipAsync } from "./../sync/_private/zipAsync"

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment */

/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export const bindLinq = <T, Y extends Iterable<T>>(object: IPrototype<Y>) => {
    const prototype = object.prototype as IEnumerable<T>

    const bind = (func: (x: IEnumerable<T>, ...params: any[]) => any, key: keyof IEnumerable<T>, length?: number) => {
        switch (length || func.length) {
            case 1:
                prototype[key] = function(this: IEnumerable<T>) {
                    return func(this)
                } as any
                return
            case 2:
                prototype[key] = function(this: IEnumerable<T>, a: any) {
                    return func(this, a)
                } as any
                return
            case 3:
                prototype[key] = function(this: IEnumerable<T>, a: any, b: any) {
                    return func(this, a, b)
                } as any
                return
            case 4:
                prototype[key] = function(this: IEnumerable<T>, a: any, b: any, c: any) {
                    return func(this, a, b, c)
                } as any
                return
            case 5:
                prototype[key] = function(this: IEnumerable<T>, a: any, b: any, c: any, d: any) {
                    return func(this, a, b, c, d)
                } as any
                return
            case 6:
                prototype[key] = function(this: IEnumerable<T>, a: any, b: any, c: any, d: any, e: any) {
                    return func(this, a, b, c, d, e)
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
    // TODO - Browsers not naming arrow functions properly
    bind(asAsync, "asAsync")
    bind(asParallel, "asParallel")
    bind(average, "average")
    bind(averageAsync, "averageAsync")
    bind(concatenate, "concatenate")
    bind(contains, "contains", 3)
    bind(containsAsync, "containsAsync")
    bind(count, "count")
    bind(countAsync, "countAsync")
    bind(distinct, "distinct", 2)
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
    bind(intersect, "intersect", 3)
    bind(intersectAsync, "intersectAsync")
    bind(join, "joinByKey", 6)
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
    bind(sequenceEquals, "sequenceEquals", 3)
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
