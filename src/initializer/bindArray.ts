import { ArrayEnumerable } from "../sync/ArrayEnumerable"
import { IConstructor, IEnumerable } from "../types"

/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export const bindArray = <TSource, Y extends Iterable<TSource> & ArrayLike<TSource>, TKey extends keyof IEnumerable<TSource>>(jsArray: IConstructor<Y>) => {
    const arrayEnumerablePrototype = ArrayEnumerable.prototype
    const bindToPrototype = jsArray.prototype as Y & IEnumerable<TSource>

    const propertyNames = Object
        .getOwnPropertyNames(arrayEnumerablePrototype) as TKey[]

    for (const prop of propertyNames) {
        bindToPrototype[prop] =  bindToPrototype[prop] ?? arrayEnumerablePrototype[prop]
    }
}
