import { IEnumerable } from "../types"
import { BaseEnumerable } from "./BaseEnumerable"
import { BasicEnumerable } from "./BasicEnumerable"
import { ArrayEnumerable } from "./sync"

/**
 * Determine if a source is a IEnumerable
 * @param source Any Value
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

    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable.prototype)
        .filter((v) => v !== "constructor")

    const methods = source.prototype || source

    for (const prop of propertyNames) {
        if (!(methods[prop] instanceof Function)) {
            return false
        }
    }

    return true
}
