import { fromAsync } from "../../async/static/fromAsync"
import { IParallelEnumerable } from "../../types"

/**
 * Converts a IEnumerable enumerable to an async one.
 * @param source A parallel IEnumerable
 * @returns IAsyncEnumerable<TSource>
 */
export const asAsync = <TSource>(source: IParallelEnumerable<TSource>) => {
    async function* generator() {
        for await (const value of source) {
            yield value
        }
    }
    return fromAsync(generator)
}
