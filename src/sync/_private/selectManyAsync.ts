import { from } from "../../async/AsyncEnumerable"
import { IAsyncEnumerable } from "../../types"

export function selectManyAsync<TSource, TResult>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<Iterable<TResult>>): IAsyncEnumerable<TResult> {
    async function* generator() {
        for (const value of source) {
            const innerValues = await selector(value)
            for (const innerValue of innerValues) {
                yield innerValue
            }
        }
    }

    return from(generator)
}
