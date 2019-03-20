import { ArrayEnumerable } from "../sync/ArrayEnumerable"
import { IPrototype } from "../types"

/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export const bindArray = <T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IPrototype<Y>) => {
    const propertyNames = Object.getOwnPropertyNames(ArrayEnumerable.prototype)
        .filter((v) => v !== "constructor")

    for (const prop of propertyNames) {
        jsArray.prototype[prop] =  jsArray.prototype[prop] || (ArrayEnumerable.prototype as any)[prop]
    }
}
