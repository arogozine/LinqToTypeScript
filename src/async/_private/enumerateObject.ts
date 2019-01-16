import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Iterates through the object
 * @param source Source Object
 * @returns IAsyncEnumerabe<[TKey, TValue]> of Key Value pairs
 */
export function enumerateObject<TInput>(
    source: TInput): IAsyncEnumerable<[keyof TInput, TInput[keyof TInput]]> {
    async function *iterable(): AsyncIterableIterator<[keyof TInput, TInput[keyof TInput]]> {
        /* tslint:disable */
        for (const key in source) {
            yield [ key, source[key] ]
        }
        /* tslint:enable */
    }

    return new BasicAsyncEnumerable(iterable)
}
