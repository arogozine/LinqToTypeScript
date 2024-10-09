import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const each = <TSource>(
    source: AsyncIterable<TSource>, action: (x: TSource) => void): IAsyncEnumerable<TSource> => {
    async function *iterator() {
        for await (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
