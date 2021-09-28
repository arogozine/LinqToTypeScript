import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Returns an empty IEnumerable<T> that has the specified type argument.
 * @returns An empty IEnumerable<T> whose type argument is TResult.
 */
export const empty = <TResult>(): IEnumerable<TResult> => {
    return new BasicEnumerable(function*() { })
}
