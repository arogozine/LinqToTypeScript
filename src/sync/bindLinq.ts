import { IEnumerable, IPrototype } from "../types"
import { BaseEnumerable } from "./BaseEnumerable"
import { BasicEnumerable } from "./BasicEnumerable"
import { ArrayEnumerable } from "./sync"

import { aggregate } from "./_private/aggregate"
import { all } from "./_private/all"
import { allAsync } from "./_private/allAsync"
import { any } from "./_private/any"
import { anyAsync } from "./_private/anyAsync"
import { average } from "./_private/average"
import { averageAsync } from "./_private/averageAsync"
import { contains } from "./_private/contains"
import { containsAsync } from "./_private/containsAsync"
import { count } from "./_private/count"
import { countAsync } from "./_private/countAsync"
import { elementAt } from "./_private/elementAt"
import { elementAtOrDefault } from "./_private/elementAtOrDefault"
import { first } from "./_private/first"
import { firstAsync } from "./_private/firstAsync"
import { firstOrDefault } from "./_private/firstOrDefault"
import { firstOrDefaultAsync } from "./_private/firstOrDefaultAsync"
import { last } from "./_private/last"
import { lastAsync } from "./_private/lastAsync"
import { lastOrDefault } from "./_private/lastOrDefault"
import { lastOrDefaultAsync } from "./_private/lastOrDefaultAsync"
import { max } from "./_private/max"
import { maxAsync } from "./_private/maxAsync"
import { min } from "./_private/min"
import { minAsync } from "./_private/minAsync"
import { single } from "./_private/single"
import { singleAsync } from "./_private/singleAsync"
import { singleOrDefault } from "./_private/singleOrDefault"
import { singleOrDefaultAsync } from "./_private/singleOrDefaultAsync"
import { sum } from "./_private/sum"
import { sumAsync } from "./_private/sumAsync"
import { toArray } from "./_private/toArray"
import { toMap } from "./_private/toMap"
import { toMapAsync } from "./_private/toMapAsync"
import { toSet } from "./_private/toSet"
import {
    asAsync, asParallel,
    concat,
    distinct, distinctAsync,
    each, eachAsync, except, exceptAsync,
    groupBy, groupByAsync, groupByWithSel,
    intersect, intersectAsync,
    join,
    ofType, orderBy, orderByAsync, orderByDescending, orderByDescendingAsync,
    reverse,
    select, selectAsync, selectMany, selectManyAsync, sequenceEquals, sequenceEqualsAsync,
    skip, skipWhile, skipWhileAsync,
    take, takeWhile, takeWhileAsync,
    union, unionAsync,
    where, whereAsync,
    zip, zipAsync,
 } from "./Enumerable"

/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void {

    const { prototype } = object

    const bind = (func: (x: IEnumerable<T>, ...params: any[]) => any, optKey?: keyof IEnumerable<T>) => {
        const key = optKey || func.name as keyof IEnumerable<T>
        switch (func.length) {
            case 1:
                prototype[key] = function(this: IEnumerable<T>) {
                    return func(this)
                }
                return
            case 2:
                prototype[key] = function(this: IEnumerable<T>, a: any) {
                    return func(this, a)
                }
                return
            case 3:
                prototype[key] = function(this: IEnumerable<T>, a: any, b: any) {
                    return func(this, a, b)
                }
                return
            case 4:
                prototype[key] = function(this: IEnumerable<T>, a: any, b: any, c: any) {
                    return func(this, a, b, c)
                }
                return
            case 5:
                prototype[key] = function(this: IEnumerable<T>, a: any, b: any, c: any, d: any) {
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
    // TODO - Browsers not naming arrow functions properly
    bind(asAsync, "asAsync")
    bind(asParallel)
    bind(average)
    bind(averageAsync)
    bind(concat)
    bind(contains)
    bind(containsAsync)
    bind(count)
    bind(countAsync)
    bind(distinct)
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
    bind(intersect)
    bind(intersectAsync)
    bind(join, "joinByKey")
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
    bind(sequenceEquals)
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

/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IPrototype<T, Y>): void {
    const propertyNames = Object.getOwnPropertyNames(ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        jsArray.prototype[prop] =  jsArray.prototype[prop] || (ArrayEnumerable.prototype as any)[prop]
    }
}

/**
 * Determine if a source is a IEnumerable
 * @param source Any Value
 */
export function isEnumerable(source: any): source is IEnumerable<any> {
    if (!source) {
        return false
    }

    if (source instanceof BasicEnumerable) {
        return true
    }

    if (source instanceof ArrayEnumerable) {
        return true
    }

    if (!(source[Symbol.iterator] instanceof Function)) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false
        }
    }

    return true
}
