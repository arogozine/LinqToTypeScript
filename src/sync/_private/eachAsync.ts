import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../types"

export function eachAsync<TSource>(
    source: Iterable<TSource>, action: (x: TSource) => Promise<void>): IAsyncEnumerable<TSource> {
    async function *generator() {
        for (const value of source) {
            await action(value)
            yield value
        }
    }

    return from(generator)
}
