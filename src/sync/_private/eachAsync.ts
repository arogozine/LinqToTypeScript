import { fromAsync } from "../../async/_private/fromAsync"
import { IAsyncEnumerable } from "../../types"

/**
 * Performs a specified action on each element of the Iterable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IAsyncEnumerable<T> that executes the action lazily as you iterate.
 */
export const eachAsync = <TSource>(
    source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> => {
    async function *generator() {
        for (const value of source) {
            await action(value)
            yield value
        }
    }

    return fromAsync(generator)
}
