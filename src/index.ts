import { BaseEnumerable } from "./Enumerable"
import { IPrototype } from "./Interfaces"
import { bindAllArrayTypes } from "./LinqForArray"

export {
    StrictEqualityComparer, EqualityComparer, StringifyComparer,
    NumberComparer,
    AsTuple,
    InvalidOperationException, ArgumentOutOfRangeException,
    ArrayIterator } from "./TypesAndHelpers"
export {
    IComparer,
    IConstructor,
    IEnumerable,
    IOrderedEnumerable, IEqualityComparer, IPrototype, RecOrdMap, ITuple } from "./Interfaces"
export { IAsyncEnumerable } from "./AsyncInterfaces"
export { ArrayEnumerable, BasicEnumerable, Enumerable } from "./Enumerable"
export { AsyncEnumerable } from "./AsyncEnumerable"
export { IArray, IArrayConstructor, bindArray, bindAllArrayTypes } from "./LinqForArray"

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
 * Binds LINQ methods to Array Types, Map, Set, and String
 */
export function initializeLinq() {
    bindLinq(Array)
    bindLinq(Map)
    bindLinq(Set)
    bindLinq(String)

    bindLinq(Int8Array)
    bindLinq(Int16Array)
    bindLinq(Int32Array)

    bindLinq(Uint8Array)
    bindLinq(Uint8ClampedArray)
    bindLinq(Uint16Array)
    bindLinq(Uint32Array)

    bindLinq(Float32Array)
    bindLinq(Float64Array)

    bindAllArrayTypes()
}
