import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Iterates through the object
 * @param source Source Object
 * @returns IEnumerabe<[TKey, TValue]> of Key Value pairs
 */
export function enumerateObject<TInput>(source: TInput): IEnumerable<[keyof TInput, TInput[keyof TInput]]> {
    function *iterable(): IterableIterator<[keyof TInput, TInput[keyof TInput]]> {
        // tslint:disable-next-line:forin
        for (const key in source) {
            yield [ key, source[key] ]
        }
    }

    return new BasicEnumerable(iterable)
}
