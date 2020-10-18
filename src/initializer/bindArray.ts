import { ArrayEnumerable } from "../sync/ArrayEnumerable"
import { IConstructor } from "../types"

/**
 * Binds LINQ method to a built in array type
 * @param jsArray Built In JS Array Type
 */
export const bindArray = <T, Y extends Iterable<T> & ArrayLike<T>>(jsArray: IConstructor<Y>) => {
    const propertyNames = Object.getOwnPropertyNames(ArrayEnumerable.prototype)
        // eslint-disable-next-line @typescript-eslint/array-type
        .filter((v) => v !== "constructor") as Array<keyof Y>

    for (const prop of propertyNames) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        jsArray.prototype[prop] =  jsArray.prototype[prop] || (ArrayEnumerable.prototype as any)[prop]
    }
}
