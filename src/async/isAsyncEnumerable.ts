import { IAsyncEnumerable } from "../types"
import { BasicAsyncEnumerable } from "./BasicAsyncEnumerable"

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

/**
 * Determine if a type is IAsyncEnumerable
 * @param source Any Value
 * @returns Whether or not source is an Async Enumerable
 */
export function isAsyncEnumerable(source: any): source is IAsyncEnumerable<any> {
    if (!source) {
        return false
    }

    if (source instanceof BasicAsyncEnumerable) {
        return true
    }

    if (typeof source[Symbol.asyncIterator] !== "function") {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BasicAsyncEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source
    for (const prop of propertyNames) {
        if (typeof methods[prop] !== "function") {
            return false
        }
    }

    return true
}
