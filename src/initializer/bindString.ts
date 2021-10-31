import { IEnumerable } from '../types'
import { ArgumentOutOfRangeException, ErrorString, InvalidOperationException } from "../shared"
import { BasicEnumerable } from '../sync/BasicEnumerable'

/**
 * Adds LINQ methods to String prototype
 */
export const bindString = <TKey extends keyof IEnumerable<string>>() => {
    const prototype = String.prototype as string & IEnumerable<string>
    const propertyNames = Object.getOwnPropertyNames(BasicEnumerable.prototype) as TKey[]
    for (const prop of propertyNames) {
        prototype[prop] = prototype[prop] ?? BasicEnumerable.prototype[prop]
    }

    prototype.first = function(predicate?: (x: string) => boolean) {
        if (predicate) {
            for (let i = 0; i < this.length; i++) {
                const value = this[i]
                if (predicate(value) === true) {
                    return value
                }
            }

            throw new InvalidOperationException(ErrorString.NoMatch)
        }
        if (this.length === 0) {
            throw new InvalidOperationException(ErrorString.NoElements)
        }
        return this[0]
    }

    prototype.firstOrDefault = function(predicate?: (x: string) => boolean) {
        if (predicate) {
            for (let i = 0; i < this.length; i++) {
                const value = this[i]
                if (predicate(value) === true) {
                    return value
                }
            }
            return null
        }

        return this.length === 0 ? null : this[0]
    }

    prototype.count = function(predicate?: (x: string) => boolean) {
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

    prototype.elementAt = function(index: number): string {
        if (index < 0 || index >= this.length) {
            throw new ArgumentOutOfRangeException("index")
        }

        return this[index]
    }

    prototype.elementAtOrDefault = function(index: number): string | null {
        return this[index] || null
    }

    prototype.last = function(predicate?: (x: string) => boolean): string {
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

    prototype.lastOrDefault = function(predicate?: (x: string) => boolean): string | null {
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

    prototype.reverse = function() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const outer = this

        function* generator() {
            for (let i = outer.length - 1; i >= 0; i--)
            {
                yield outer[i]
            }
        }

        return new BasicEnumerable(generator)
    }
}