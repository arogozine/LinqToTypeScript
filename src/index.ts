import { IPrototype } from "./TypesAndHelpers"
import { BasicEnumerable } from "./Enumerable"
import "./LinqForArray"
import "./LinqForMap"

export {
    IEqualityComparer, StrictEqualityComparer, EqualityComparer, StringifyComparer,
    IComparer, NumberComparer,
    Tuple, AsTuple,
    IConstructor, IPrototype,
    RecOrdMap,
    InvalidOperationException, ArgumentOutOfRangeException,
    ArrayIterator } from "./TypesAndHelpers"
export { IEnumerable, IOrderedEnumerable } from "./IEnumerable"
export { Enumerable } from "./Enumerable"

function bindLinq<T, Y extends Iterable<T>>(object: IPrototype<T, Y>): void {

    const propertyNames = Object.getOwnPropertyNames(BasicEnumerable.prototype)
        .filter(v => v !== "constructor")

    for (let prop of propertyNames) {
        object.prototype[prop] =  object.prototype[prop] || (BasicEnumerable.prototype as any)[prop]
    }
}

export function initialize() {
    bindLinq(Array)
    bindLinq(Map)
}