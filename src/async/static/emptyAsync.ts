import type { IAsyncEnumerable } from "../../types"
import { BasicAsyncEnumerable } from "../BasicAsyncEnumerable"

/**
 * Returns an empty IAsyncEnumerable<T> that has the specified type argument.
 * @returns An empty IAsyncEnumerable<T> whose type argument is TResult.
 */
export const emptyAsync = <TResult>(): IAsyncEnumerable<TResult> => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return new BasicAsyncEnumerable<TResult>(async function *iterable() { })
}
