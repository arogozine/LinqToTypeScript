import { IAsyncEnumerable } from "."
import { BasicAsyncEnumerable } from "./async/BasicAsyncEnumerable"
import { BasicParallelEnumerable } from "./parallel/BasicParallelEnumerable"
import { IParallelEnumerable } from "./parallel/parallel"
import { IConstructor } from "./shared/shared"
import { BasicEnumerable } from "./sync/BasicEnumerable"
import { ArrayEnumerable, BaseEnumerable, IEnumerable } from "./sync/sync"

// Shared Interfacess
export * from "./shared/shared"

// Enumerable
export * from "./sync/sync"

// AsyncEnumerable
export * from "./async/async"

// ParallelEnumerable
export * from "./parallel/parallel"

export interface IPrototype<T, Y extends Iterable<T>> extends IConstructor<{ [key: string]: any }> {
    new (_?: any): Y
}

export function isParallelEnumerable(source: any): source is IParallelEnumerable<any> {
    if (!source) {
        return false
    }

    if (source instanceof BasicParallelEnumerable) {
        return true
    }

    if (!source[Symbol.asyncIterator]) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BasicParallelEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        if (!source.prototype[prop]) {
            return false
        }
    }

    return true
}

export function isAsyncEnumerable(source: any): source is IAsyncEnumerable<any> {
    if (!source) {
        return false
    }

    if (source instanceof BasicAsyncEnumerable) {
        return true
    }

    if (!source[Symbol.asyncIterator]) {
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BasicAsyncEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        if (!source.prototype[prop]) {
            return false
        }
    }

    return true
}

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

    if (!source[Symbol.iterator]) {
        console.log(`No Iterator ${ source }`)
        return false
    }

    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable.prototype)
        .filter((v) => v !== "constructor")

    console.log(propertyNames)

    const methods = source.prototype || source
    for (const prop of propertyNames) {
        if (!methods[prop]) {
            console.log(prop)
            return false
        }
    }

    console.log(`Gets to True`)
    return true
}

/**
 * Binds LINQ methods to an iterable type
 * @param object Iterable Type
 */
export function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void {

    const propertyNames = Object.getOwnPropertyNames(BaseEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        object.prototype[prop] =  object.prototype[prop] || (BaseEnumerable.prototype as any)[prop]
    }
}

/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export function bindArray<T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IPrototype<T, Y>): void {
    const propertyNames = Object.getOwnPropertyNames(ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        jsArray.prototype[prop] =  jsArray.prototype[prop] || (ArrayEnumerable.prototype as any)[prop]
    }
}

/**
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
export function initializeLinq() {
    bindArray(Array)
    bindLinq(Map)
    bindLinq(Set)
    bindLinq(String)

    bindArray(Int8Array)
    bindArray(Int16Array)
    bindArray(Int32Array)

    bindArray(Uint8Array)
    bindArray(Uint8ClampedArray)
    bindArray(Uint16Array)
    bindArray(Uint32Array)

    bindArray(Float32Array)
    bindArray(Float64Array)
}
