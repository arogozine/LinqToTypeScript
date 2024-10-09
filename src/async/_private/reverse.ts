import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

export const reverse = <TSource>(source: AsyncIterable<TSource>): IAsyncEnumerable<TSource> => {

    async function* iterator() {
        const values = []
        for await (const value of source) {
            values.push(value)
        }

        for (let i = values.length - 1; i >= 0; i--) {
            yield values[i]
        }
    }

    return new BasicAsyncEnumerable(iterator)
}
