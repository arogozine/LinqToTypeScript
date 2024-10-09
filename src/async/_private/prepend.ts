import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const prepend = <TSource>(source: AsyncIterable<TSource>, element: TSource): IAsyncEnumerable<TSource> => {
    async function* iterator() {
        yield element
        yield* source
    }

    return new BasicAsyncEnumerable(iterator)
}
