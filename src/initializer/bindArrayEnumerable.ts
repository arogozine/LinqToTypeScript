import { IEnumerable, IEqualityComparer } from "../types"

import { aggregate } from "../sync/_private/aggregate"
import { allAsync } from "../sync/_private/allAsync"
import { anyAsync } from "../sync/_private/anyAsync"
import { asAsync } from "../sync/_private/asAsync"
import { asParallel } from "../sync/_private/asParallel"
import { average } from "../sync/_private/average"
import { averageAsync } from "../sync/_private/averageAsync"
import { contains } from "../sync/_private/contains"
import { containsAsync } from "../sync/_private/containsAsync"
import { countAsync } from "../sync/_private/countAsync"
import { distinct } from "../sync/_private/distinct"
import { distinctAsync } from "../sync/_private/distinctAsync"
import { each } from "../sync/_private/each"
import { eachAsync } from "../sync/_private/eachAsync"
import { except } from "../sync/_private/except"
import { exceptAsync } from "../sync/_private/exceptAsync"
import { firstAsync } from "../sync/_private/firstAsync"
import { firstOrDefaultAsync } from "../sync/_private/firstOrDefaultAsync"
import { groupBy } from "../sync/_private/groupBy"
import { groupByAsync } from "../sync/_private/groupByAsync"
import { groupByWithSel } from "../sync/_private/groupByWithSel"
import { intersect } from "../sync/_private/intersect"
import { intersectAsync } from "../sync/_private/intersectAsync"
import { join } from "../sync/_private/join"
import { lastAsync } from "../sync/_private/lastAsync"
import { lastOrDefaultAsync } from "../sync/_private/lastOrDefaultAsync"
import { maxAsync } from "../sync/_private/maxAsync"
import { minAsync } from "../sync/_private/minAsync"
import { ofType } from "../sync/_private/ofType"
import { orderBy } from "../sync/_private/orderBy"
import { orderByAsync } from "../sync/_private/orderByAsync"
import { orderByDescending } from "../sync/_private/orderByDescending"
import { orderByDescendingAsync } from "../sync/_private/orderByDescendingAsync"
import { select } from "../sync/_private/select"
import { selectAsync } from "../sync/_private/selectAsync"
import { selectMany } from "../sync/_private/selectMany"
import { selectManyAsync } from "../sync/_private/selectManyAsync"
import { sequenceEquals } from "../sync/_private/sequenceEquals"
import { sequenceEqualsAsync } from "../sync/_private/sequenceEqualsAsync"
import { single } from "../sync/_private/single"
import { singleAsync } from "../sync/_private/singleAsync"
import { singleOrDefault } from "../sync/_private/singleOrDefault"
import { singleOrDefaultAsync } from "../sync/_private/singleOrDefaultAsync"
import { skip } from "../sync/_private/skip"
import { skipWhile } from "../sync/_private/skipWhile"
import { skipWhileAsync } from "../sync/_private/skipWhileAsync"
import { sum } from "../sync/_private/sum"
import { sumAsync } from "../sync/_private/sumAsync"
import { take } from "../sync/_private/take"
import { takeWhile } from "../sync/_private/takeWhile"
import { takeWhileAsync } from "../sync/_private/takeWhileAsync"
import { toArray } from "../sync/_private/toArray"
import { toMap } from "../sync/_private/toMap"
import { toMapAsync } from "../sync/_private/toMapAsync"
import { toSet } from "../sync/_private/toSet"
import { union } from "../sync/_private/union"
import { unionAsync } from "../sync/_private/unionAsync"
import { where } from "../sync/_private/where"
import { whereAsync } from "../sync/_private/whereAsync"
import { zip } from "../sync/_private/zip"
import { zipAsync } from "../sync/_private/zipAsync"

import { ArgumentOutOfRangeException } from "../shared/ArgumentOutOfRangeException"
import { ErrorString } from "../shared/ErrorString"
import { InvalidOperationException } from "../shared/InvalidOperationException"
import { ArrayEnumerable } from "../sync/ArrayEnumerable"
import { BasicEnumerable } from "../sync/BasicEnumerable"

// tslint:disable:completed-docs

/**
 * @private
 */
export function bindArrayEnumerable<T>(): void {

    const prototype = ArrayEnumerable.prototype

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
    prototype.all = function(this: ArrayEnumerable<T>, predicate: (x: T) => boolean): boolean {
        return this.every(predicate)
    }
    bind(allAsync)
    prototype.any = function(predicate?: (x: T) => boolean): boolean {
        if (predicate) {
            return this.some(predicate)
        } else {
            return this.length !== 0
        }
    }
    bind(anyAsync)
    // TODO - Browsers not naming arrow functions properly
    bind(asAsync, "asAsync")
    bind(asParallel)
    bind(average)
    bind(averageAsync)
    prototype.concat = function(this: ArrayEnumerable<T>) {
        let items: any
        if (arguments.length === 1) {
            items = arguments[0]
        } else {
            items = [...arguments]
        }

        if (items instanceof BasicEnumerable) {
            // this scoping
            const enumerable = this
            function *iterator() {
                for (const x of enumerable) {
                    yield x
                }
                for (const x of items) {
                    yield x
                }
            }

            return new BasicEnumerable(iterator)
        } else {
            return Array.prototype.concat.apply(this, [items])
        }
    } as any // TODO
    prototype.contains = function(value: T, comparer?: IEqualityComparer<T>) {
        return contains(this, value, comparer)
    }
    bind(containsAsync)
    prototype.count = function(predicate?: (x: T) => boolean) {
        if (predicate) {
            // tslint:disable-next-line:no-shadowed-variable
            let count = 0
            for (let i = 0; i < this.length; i ++) {
                if (predicate(this[i]) === true) {
                    count++
                }
            }
            return count
        } else {
            return this.length
        }
    }
    bind(countAsync)
    prototype.distinct = function(comparer?: IEqualityComparer<T>) {
        return distinct(this, comparer)
    }
    bind(distinctAsync)
    bind(each)
    bind(eachAsync)
    prototype.elementAt = function(index: number): T {
        if (index < 0 || index >= this.length) {
            throw new ArgumentOutOfRangeException("index")
        }

        return this[index]
    }
    prototype.elementAtOrDefault = function(index: number): T | null {
        return this[index] || null
    }
    bind(except)
    bind(exceptAsync)
    prototype.first = function(predicate?: (x: T) => boolean): T {
        if (predicate) {
            const value = this.find(predicate)
            if (value === undefined) {
                throw new InvalidOperationException(ErrorString.NoMatch)
            } else {
                return value
            }
        } else {
            if (this.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return this[0]
        }
    }
    bind(firstAsync)
    prototype.firstOrDefault = function(predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            const value = this.find(predicate)
            if (value === undefined) {
                return null
            } else {
                return value
            }
        } else {
            return this.length === 0 ? null : this[0]
        }
    }
    bind(firstOrDefaultAsync)
    bind(groupBy)
    bind(groupByAsync)
    bind(groupByWithSel)
    prototype.intersect = function(second: IEnumerable<T>, comparer?: IEqualityComparer<T>) {
        return intersect(this, second, comparer)
    }
    bind(intersectAsync)
    prototype.joinByKey = function<TInner, TKey, TResult>(
        inner: IEnumerable<TInner>,
        outerKeySelector: (x: T) => TKey,
        innerKeySelector: (x: TInner) => TKey,
        resultSelector: (x: T, y: TInner) => TResult,
        comparer?: IEqualityComparer<TKey>) {
        return join(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer)
    }
    prototype.last = function(predicate?: (x: T) => boolean): T {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i]
                if (predicate(value) === true) {
                    return value
                }
            }

            throw new InvalidOperationException(ErrorString.NoMatch)
        } else {
            if (this.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return this[this.length - 1]
        }
    }
    bind(lastAsync)
    prototype.lastOrDefault = function(predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i]
                if (predicate(value) === true) {
                    return value
                }
            }

            return null
        } else {
            return this.length === 0 ? null : this[this.length - 1]
        }
    }

    bind(lastOrDefaultAsync)
    prototype.max = function(selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            // tslint:disable-next-line:no-shadowed-variable
            let max = Number.NEGATIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max)
            }

            return max
        } else {
            return Math.max.apply(null, this)
        }
    }

    bind(maxAsync)
    prototype.min = function(selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            // tslint:disable-next-line:no-shadowed-variable
            let min = Number.POSITIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min)
            }

            return min
        } else {
            return Math.min.apply(null, this)
        }
    }

    bind(minAsync)
    bind(ofType)
    bind(orderBy)
    bind(orderByAsync)
    bind(orderByDescending)
    bind(orderByDescendingAsync)
    prototype.reverse = function() {
        Array.prototype.reverse.apply(this)
        return this
    }
    bind(select)
    bind(selectAsync)
    bind(selectMany)
    bind(selectManyAsync)
    prototype.sequenceEquals = function(second: IEnumerable<T>, comparer?: IEqualityComparer<T>) {
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
