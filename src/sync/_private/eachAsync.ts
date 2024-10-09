import { fromAsync } from "../../async/static/fromAsync"
import type { IAsyncEnumerable } from "../../types"

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
