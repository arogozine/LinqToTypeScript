import { IParallelEnumerable } from "../types"
import { BasicParallelEnumerable } from "./BasicParallelEnumerable"

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */

/**
 * Determine if the source is IParallelEnumerable
 * @param source Any value
 * @returns Whether or not this type is a Parallel Enumerable
 */
export const isParallelEnumerable = (source: any): source is IParallelEnumerable<any> => {
    if (!source) {
        return false
    }

    if (source instanceof BasicParallelEnumerable) {
        return true
    }

    if (!(source[Symbol.asyncIterator] instanceof Function)) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BasicParallelEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source
    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false
        }
    }

    return true
}
