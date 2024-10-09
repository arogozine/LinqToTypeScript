import type { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Returns an empty IEnumerable<T> that has the specified type argument.
 * @returns An empty IEnumerable<T> whose type argument is TResult.
 */
export const empty = <TResult>(): IEnumerable<TResult> => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return new BasicEnumerable(function*() { })
}
