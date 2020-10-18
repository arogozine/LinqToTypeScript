import { IEnumerable } from "../types"
import { ArrayEnumerable } from "./ArrayEnumerable"
import { BasicEnumerable } from "./BasicEnumerable"

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

/**
 * Determine if a source is a IEnumerable
 * @param source Any Value
 * @returns Whether or not this is an Enumerable type
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

    const propertyNames = Object.getOwnPropertyNames(BasicEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source

    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false
        }
    }

    return true
}
