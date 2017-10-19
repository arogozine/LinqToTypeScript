/*
// #############################
// ## Optimizations for Array ##
// #############################

import { IEnumerable } from "./Interfaces"
import { ArgumentOutOfRangeException, ErrorString, InvalidOperationException } from "./TypesAndHelpers"

interface IArray<T, Y> extends ArrayLike<T>, IEnumerable<T> {
    every(callbackfn: (value: T, index: number, array: Y) => boolean, thisArg?: any): boolean
    find(predicate: (value: T, index: number, obj: any) => boolean, thisArg?: any): T | undefined
    slice(start?: number, end?: number): Y
    filter(callbackfn: (value: T, index: number, array: Y) => any, thisArg?: any): Y
    some(callbackfn: (value: T, index: number, array: Y) => boolean, thisArg?: any): boolean
}

interface IArrayConstructor<T, Y extends IArray<T, Y>> {
    new (_?: any): Y
    readonly prototype: IEnumerable<T>
}

// tslint:disable
declare global {
    interface Array<T> extends IEnumerable<T> {

    }

    interface Uint8Array extends IEnumerable<number> {

    }

    interface Uint8ClampedArray extends IEnumerable<number> {

    }

    interface Uint16Array extends IEnumerable<number> {

    }

    interface Uint32Array extends IEnumerable<number> {

    }

    interface Int8Array extends IEnumerable<number> {

    }

    interface Int16Array extends IEnumerable<number> {

    }

    interface Int32Array extends IEnumerable<number> {

    }

    interface Float32Array extends IEnumerable<number> {

    }

    interface Float64Array extends IEnumerable<number> {

    }
}
// tslint:enable

function bindArray<T, Y extends IArray<T, Y>>(array: IArrayConstructor<T, Y>): void {

    type genericArray = IArray<T, Y>

    array.prototype.all = function(this: genericArray, predicate: (x: T) => boolean): boolean {
        return this.every(predicate)
    }

    array.prototype.any = function(this: genericArray, predicate?: (x: T) => boolean): boolean {
        return this.some(predicate || ((_) => true))
    }

    array.prototype.count = function(this: genericArray, predicate?: (x: T) => boolean): number {
        if (predicate) {
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

    array.prototype.elementAt = function(this: genericArray, index: number): T {
        if (index >= this.length) {
            throw new ArgumentOutOfRangeException("index")
        }

        return this[index]
    }

    array.prototype.first = function(this: genericArray, predicate?: (x: T) => boolean): T {
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

    array.prototype.firstOrDefault = function(
        this: IArray<any, Y>,
        predicate?: (x: T) => boolean): T | null {
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

    array.prototype.last = function(this: genericArray, predicate?: (x: T) => boolean): T {
        if (predicate) {
            for (let i = 0; i < this.length; i++) {
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

    array.prototype.lastOrDefault = function(this: genericArray, predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            for (let i = 0; i < this.length; i++) {
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

    array.prototype.max = function(this: IArray<any, Y>, selector?: (x: T) => number): number | never {

        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            let max = Number.MIN_VALUE

            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max)
            }

            return max
        } else {
            return Math.max(...(this as any))
        }
    }

    array.prototype.min = function(this: IArray<any, Y>, selector?: (x: T) => number): number {

        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            let min = Number.MAX_VALUE

            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min)
            }

            return min
        } else {
            return Math.min(...(this as any))
        }
    }

    array.prototype.toArray = function(this: genericArray): T[] {
        const newArray = new Array<T>(this.length)
        for (let i = 0; i < this.length; i++) {
            newArray[i] = this[i]
        }
        return newArray
    }

    array.prototype.toMap = function<TKey>(this: genericArray, selector: (x: T) => TKey): Map<TKey, T[]> {
        const map = new Map<TKey, T[]>()
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

    array.prototype.where = function(
        this: genericArray,
        predicate: ((x: T) => boolean) | ((x: T, index: number) => boolean)): IEnumerable<T> {
        return this.filter(predicate)
    }

    // reverse already exists
}

bindArray(Array)
bindArray(Int8Array)
bindArray(Int16Array)
bindArray(Int32Array)
bindArray(Uint8Array)
bindArray(Uint8ClampedArray)
bindArray(Uint16Array)
bindArray(Uint32Array)
bindArray(Float32Array)
bindArray(Float64Array)
*/
