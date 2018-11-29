import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable, IParallelEnumerable } from "../../types"

export function asAsync<TSource>(source: IParallelEnumerable<TSource>): IAsyncEnumerable<TSource> {
    async function* generator() {
        for await (const value of source) {
            yield value
        }
    }
    return from(generator)
}
