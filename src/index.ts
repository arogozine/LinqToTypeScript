import { IConstructor } from "./shared/shared"
import { ArrayEnumerable, BaseEnumerable } from "./sync/sync"

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
