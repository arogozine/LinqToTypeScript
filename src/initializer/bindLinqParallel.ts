import { IAsyncParallel, IEqualityComparer, IParallelEnumerable, IPrototype } from "../types"
import { aggregate } from "./../parallel/_private/aggregate"
import { all } from "./../parallel/_private/all"
import { allAsync } from "./../parallel/_private/allAsync"
import { any } from "./../parallel/_private/any"
import { anyAsync } from "./../parallel/_private/anyAsync"
import { asAsync } from "./../parallel/_private/asAsync"
import { average } from "./../parallel/_private/average"
import { averageAsync } from "./../parallel/_private/averageAsync"
import { concat } from "./../parallel/_private/concat"
import { contains } from "./../parallel/_private/contains"
import { containsAsync } from "./../parallel/_private/containsAsync"
import { count } from "./../parallel/_private/count"
import { countAsync } from "./../parallel/_private/countAsync"
import { distinct } from "./../parallel/_private/distinct"
import { distinctAsync } from "./../parallel/_private/distinctAsync"
import { each } from "./../parallel/_private/each"
import { eachAsync } from "./../parallel/_private/eachAsync"
import { elementAt } from "./../parallel/_private/elementAt"
import { elementAtOrDefault } from "./../parallel/_private/elementAtOrDefault"
import { except } from "./../parallel/_private/except"
import { exceptAsync } from "./../parallel/_private/exceptAsync"
import { first } from "./../parallel/_private/first"
import { firstAsync } from "./../parallel/_private/firstAsync"
import { firstOrDefault } from "./../parallel/_private/firstOrDefault"
import { firstOrDefaultAsync } from "./../parallel/_private/firstOrDefaultAsync"
import { groupBy } from "./../parallel/_private/groupBy"
import { groupByAsync } from "./../parallel/_private/groupByAsync"
import { groupByWithSel } from "./../parallel/_private/groupByWithSel"
import { intersect } from "./../parallel/_private/intersect"
import { intersectAsync } from "./../parallel/_private/intersectAsync"
import { join } from "./../parallel/_private/join"
import { last } from "./../parallel/_private/last"
import { lastAsync } from "./../parallel/_private/lastAsync"
import { lastOrDefault } from "./../parallel/_private/lastOrDefault"
import { lastOrDefaultAsync } from "./../parallel/_private/lastOrDefaultAsync"
import { max } from "./../parallel/_private/max"
import { maxAsync } from "./../parallel/_private/maxAsync"
import { min } from "./../parallel/_private/min"
import { minAsync } from "./../parallel/_private/minAsync"
import { ofType } from "./../parallel/_private/ofType"
import { orderBy } from "./../parallel/_private/orderBy"
import { orderByAsync } from "./../parallel/_private/orderByAsync"
import { orderByDescending } from "./../parallel/_private/orderByDescending"
import { orderByDescendingAsync } from "./../parallel/_private/orderByDescendingAsync"
import { reverse } from "./../parallel/_private/reverse"
import { select } from "./../parallel/_private/select"
import { selectAsync } from "./../parallel/_private/selectAsync"
import { selectMany } from "./../parallel/_private/selectMany"
import { selectManyAsync } from "./../parallel/_private/selectManyAsync"
import { sequenceEquals } from "./../parallel/_private/sequenceEquals"
import { sequenceEqualsAsync } from "./../parallel/_private/sequenceEqualsAsync"
import { single } from "./../parallel/_private/single"
import { singleAsync } from "./../parallel/_private/singleAsync"
import { singleOrDefault } from "./../parallel/_private/singleOrDefault"
import { singleOrDefaultAsync } from "./../parallel/_private/singleOrDefaultAsync"
import { skip } from "./../parallel/_private/skip"
import { skipWhile } from "./../parallel/_private/skipWhile"
import { skipWhileAsync } from "./../parallel/_private/skipWhileAsync"
import { sum } from "./../parallel/_private/sum"
import { sumAsync } from "./../parallel/_private/sumAsync"
import { take } from "./../parallel/_private/take"
import { takeWhile } from "./../parallel/_private/takeWhile"
import { takeWhileAsync } from "./../parallel/_private/takeWhileAsync"
import { toArray } from "./../parallel/_private/toArray"
import { toMap } from "./../parallel/_private/toMap"
import { toMapAsync } from "./../parallel/_private/toMapAsync"
import { toSet } from "./../parallel/_private/toSet"
import { union } from "./../parallel/_private/union"
import { unionAsync } from "./../parallel/_private/unionAsync"
import { where } from "./../parallel/_private/where"
import { whereAsync } from "./../parallel/_private/whereAsync"
import { zip } from "./../parallel/_private/zip"
import { zipAsync } from "./../parallel/_private/zipAsync"

/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export function bindLinqParallel<T, Y extends AsyncIterable<T>>(object: IPrototype<Y>): void {

    type Writeable<TType> = { -readonly [P in keyof TType]-?: TType[P] }
    const wPrototype = object.prototype as Writeable<IParallelEnumerable<T>>
    const prototype = wPrototype as IParallelEnumerable<T>

    const bind = (func: (x: IParallelEnumerable<T>, ...params: any[]) => any,
                  optKey?: keyof IParallelEnumerable<T>) => {
        const key = optKey || func.name as keyof IParallelEnumerable<T>
        switch (func.length) {
            case 1:
                wPrototype[key] = function(this: IParallelEnumerable<T>) {
                    return func(this)
                }
                return
            case 2:
                wPrototype[key] = function(this: IParallelEnumerable<T>, a: any) {
                    return func(this, a)
                }
                return
            case 3:
                wPrototype[key] = function(this: IParallelEnumerable<T>, a: any, b: any) {
                    return func(this, a, b)
                }
                return
            case 4:
                wPrototype[key] = function(this: IParallelEnumerable<T>, a: any, b: any, c: any) {
                    return func(this, a, b, c)
                }
                return
            case 5:
                wPrototype[key] = function(this: IParallelEnumerable<T>, a: any, b: any, c: any, d: any) {
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
    bind(asAsync, "asAsync")
    // bind(asParallel)
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
    prototype.intersect = function(second: IAsyncParallel<T>, comparer?: IEqualityComparer<T>) {
        return intersect(this, second, comparer)
    }
    bind(intersectAsync)
    prototype.joinByKey = function<TInner, TKey, TResult>(
        inner: IAsyncParallel<TInner>,
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
    prototype.sequenceEquals = function(second: IAsyncParallel<T>, comparer?: IEqualityComparer<T>) {
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
