import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const append = <TSource>(source: AsyncIterable<TSource>, element: TSource): IAsyncEnumerable<TSource> => {
    async function* iterator() {
        yield* source
        yield element
    }

    return new BasicAsyncEnumerable(iterator)
}
