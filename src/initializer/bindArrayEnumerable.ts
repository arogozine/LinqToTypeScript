
import { ArgumentOutOfRangeException, ErrorString, InvalidOperationException } from "../shared"
import { ArrayEnumerable } from "../sync/ArrayEnumerable"
import { BasicEnumerable } from '../sync/BasicEnumerable'
import { IEnumerable } from '../types'

/**
 * @private
 */
export const bindArrayEnumerable = <T>() => {

    const { prototype } = ArrayEnumerable

    const propertyNames = Object.getOwnPropertyNames(BasicEnumerable.prototype)
        // eslint-disable-next-line @typescript-eslint/array-type
        .filter((v) => v !== "constructor") as Array<keyof IEnumerable<string>>

    for (const prop of propertyNames) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        prototype[prop] = (prototype[prop] as any) || BasicEnumerable.prototype[prop]
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
    prototype.max = function(selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            // eslint-disable-next-line no-shadow
            let max = Number.NEGATIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                max = Math.max(selector(this[i]), max)
            }

            return max
        } else {
            return Math.max.apply(null, this)
        }
    }
    prototype.min = function(selector?: (x: T) => number): number | never {
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }

        if (selector) {
            // eslint-disable-next-line no-shadow
            let min = Number.POSITIVE_INFINITY

            for (let i = 0; i < this.length; i++) {
                min = Math.min(selector(this[i]), min)
            }

            return min
        } else {
            return Math.min.apply(null, this)
        }
    }
    prototype.reverse = function() {
        Array.prototype.reverse.apply(this)
        return this
    }
}
