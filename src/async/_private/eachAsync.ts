import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Performs a specified action on each element of the AsyncIterable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IAsyncEnumerable<T> that executes the action lazily as you iterate.
 */
export function eachAsync<TSource>(
    source: AsyncIterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
    async function *iterator() {
        for await (const value of source) {
            await action(value)
            yield value
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
