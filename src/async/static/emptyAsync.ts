import { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Returns an empty IAsyncEnumerable<T> that has the specified type argument.
 * @returns An empty IAsyncEnumerable<T> whose type argument is TResult.
 */
export const emptyAsync = <TResult>(): IAsyncEnumerable<TResult> => {
    async function *iterable() {
        for await (const _ of []) {
            yield _
        }
    }

    return new BasicAsyncEnumerable<TResult>(iterable)
}
