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

    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BasicAsyncEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false
        }
    }

    return true
}
