import { BasicEnumerable } from "./Enumerable"
import { IPrototype } from "./Interfaces"
import "./LinqForArray"
import "./LinqForMap"
import "./LinqForSet"

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
export { Enumerable } from "./Enumerable"

function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void {

    const propertyNames = Object.getOwnPropertyNames(BasicEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        object.prototype[prop] =  object.prototype[prop] || (BasicEnumerable.prototype as any)[prop]
    }
}

export function initialize() {
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
}
