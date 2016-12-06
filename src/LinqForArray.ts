// #############################
// ## Optimizations for Array ##
// #############################

import { IEnumerable } from "./IEnumerable"
import { ArgumentOutOfRangeException, InvalidOperationException, ErrorString } from "./TypesAndHelpers"

/* tslint:disable */
declare global {
    interface Array<T> extends IEnumerable<T> {
        
    }
}
/* tsline:enable */

// Array has,
// 1. length (no need to iterate to determine length)
// 2. Access to any index (no need to iterate to get first / last element)

Array.prototype.any = function<TSource>(this: TSource[], predicate?: (x: TSource) => boolean): boolean {
    return (this as any[]).some(predicate || (x => true))
}

Array.prototype.all = function<TSource>(this: TSource[], predicate: (x: TSource) => boolean): boolean {
    return this.every(predicate)
}

Array.prototype.count = function<TSource>(this: TSource[], predicate?: (x: TSource) => boolean): number {
    if (predicate) {
        let count = 0
        for (let i = 0; i < this.length; i ++) {
            if (predicate(this[i])) {
                count++
            }
        }
        return count
    } else {
        return this.length
    }
}

Array.prototype.elementAt =  function<TSource>(this: TSource[], index: number): TSource {
    if (index >= this.length) {
        throw new ArgumentOutOfRangeException("index")
    }

    return this[index]
}

Array.prototype.first = function<TSource>(this: TSource[], predicate?: (x: TSource) => boolean): TSource {
    if (predicate) {
        const value = this.find(predicate)
        if (typeof value === "undefined") {
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

Array.prototype.firstOrDefault = function<TSource>(
    this: TSource[],
    predicate?: (x: TSource) => boolean): TSource | null {
    if (predicate) {
        const value = this.find(predicate)
        if (typeof value === "undefined") {
            return null
        } else {
            return value
        }
    } else {
        return this.length === 0 ? null : this[0]
    }
}

Array.prototype.max = function<TSource>(this: TSource[], selector?: (x: TSource) => number): number {
    if (selector) {
        let max = Number.MIN_VALUE

        for (let i = 0; i < this.length; i++) {
            max = Math.max(selector(this[i]), max)
        }

        return max
    } else {
        return Math.max(...(this as any[]))
    }
}

Array.prototype.min = function<TSource>(this: TSource[], selector?: (x: TSource) => number): number {
    if (selector) {
        let min = Number.MAX_VALUE

        for (let i = 0; i < this.length; i++) {
            min = Math.min(selector(this[i]), min)
        }

        return min
    } else {
        return Math.min(...(this as any[]))
    }
}

Array.prototype.toArray = function<TSource>(this: TSource[]): TSource[] {
    return this.slice()
}

Array.prototype.toMap = function<TSource, TKey>(this: TSource[], selector: (x: TSource) => TKey): Map<TKey, TSource[]> {
    const map = new Map<TKey, TSource[]>()
    for (let i = 0; i < this.length; i++) {
        const value = this[i]
        const key = selector(value)

        const valuesForKey = map.get(key)
        if (valuesForKey) {
            valuesForKey.push(value)
        } else {
            map.set(key, [value])
        }
    }

    return map
}

Array.prototype.where = function<TSource>(
    this: TSource[],
    predicate: ((x: TSource) => boolean) | ((x: TSource, index: number) => boolean)): IEnumerable<TSource> {
    return this.filter(predicate)
}
