import { from } from "../../async/_private/from"
import { IAsyncEnumerable, IParallelEnumerable } from "../../types"

/**
 * Converts a IEnumerable enumerable to an async one.
 * @param source A parallel IEnumerable
 */
export function asAsync<TSource>(source: IParallelEnumerable<TSource>): IAsyncEnumerable<TSource> {
    async function* generator() {
        for await (const value of source) {
            yield value
        }
    }
    return from(generator)
}
