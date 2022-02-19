import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const concatenate = <TSource>(
    first: AsyncIterable<TSource>, second: AsyncIterable<TSource>): IAsyncEnumerable<TSource> => {
    async function* iterator() {
        yield* first
        yield* second
    }

    return new BasicAsyncEnumerable(iterator)
}
