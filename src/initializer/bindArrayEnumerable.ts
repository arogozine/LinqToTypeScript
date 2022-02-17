
import { ArgumentOutOfRangeException, ErrorString, InvalidOperationException } from "../shared"
import { ArrayEnumerable } from "../sync/ArrayEnumerable"
import { BasicEnumerable } from "../sync/BasicEnumerable"
import { IEnumerable } from "../types"

/**
 * @private
 */
export const bindArrayEnumerable = <T, TKey extends keyof IEnumerable<T>>() => {
    const { prototype } = ArrayEnumerable
    const propertyNames = Object.getOwnPropertyNames(BasicEnumerable.prototype) as TKey[]
    for (const prop of propertyNames) {
        prototype[prop] = prototype[prop] ?? BasicEnumerable.prototype[prop]
    }

    prototype.all = function(this: ArrayEnumerable<T>, predicate: (x: T) => boolean): boolean {
        return this.every(predicate)
    }
    prototype.any = function(predicate?: (x: T) => boolean): boolean {
        if (predicate) {
            return this.some(predicate)
        } else {
            return this.length !== 0
        }
    }
    prototype.count = function(predicate?: (x: T) => boolean) {
        if (predicate) {
            // eslint-disable-next-line no-shadow
            let count = 0
            for (let i = 0; i < this.length; i ++) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                if (predicate(this[i]) === true) {
                    count++
                }
            }
            return count
        } else {
            return this.length
        }
    }
    prototype.elementAt = function(index: number): T {
        if (index < 0 || index >= this.length) {
            throw new ArgumentOutOfRangeException("index")
        }

        return this[index] as T
    }
    prototype.elementAtOrDefault = function(index: number): T | null {
        return (this[index] as T | undefined) || null
    }
    prototype.first = function(predicate?: (x: T) => boolean): T {
        if (predicate) {
            const value = this.find(predicate) as T | undefined
            if (value === undefined) {
                throw new InvalidOperationException(ErrorString.NoMatch)
            } else {
                return value
            }
        } else {
            if (this.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return this[0] as T
        }
    }
    prototype.firstOrDefault = function(predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            const value = this.find(predicate) as T | undefined
            if (value === undefined) {
                return null
            } else {
                return value
            }
        } else {
            return this.length === 0 ? null : this[0] as T
        }
    }
    prototype.last = function(predicate?: (x: T) => boolean): T {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i] as T
                if (predicate(value) === true) {
                    return value
                }
            }

            throw new InvalidOperationException(ErrorString.NoMatch)
        } else {
            if (this.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            }

            return this[this.length - 1] as T
        }
    }
    prototype.lastOrDefault = function(predicate?: (x: T) => boolean): T | null {
        if (predicate) {
            for (let i = this.length - 1; i >= 0; i--) {
                const value = this[i] as T
                if (predicate(value) === true) {
                    return value
                }
            }

            return null
        } else {
            return this.length === 0 ? null : this[this.length - 1] as T
        }
    }
    prototype.max = function(this: ArrayEnumerable<any>, selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            // eslint-disable-next-line no-shadow
            let max = Number.NEGATIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i] as T), max)
            }

            return max
        } else {
            return Math.max.apply(null, this as ArrayEnumerable<number>)
        }
    }
    prototype.min = function(this: ArrayEnumerable<any>, selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            // eslint-disable-next-line no-shadow
            let min = Number.POSITIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i] as T), min)
            }

            return min
        } else {
            return Math.min.apply(null, this as ArrayEnumerable<number>)
        }
    }
    prototype.reverse = function() {
        Array.prototype.reverse.apply(this)
        return this
    }
}
