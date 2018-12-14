import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Returns an empty IEnumerable<T> that has the specified type argument.
 * @returns An empty IEnumerable<T> whose type argument is TResult.
 */
export function empty<TResult>(): IEnumerable<TResult> {
    const iterator = function*() {
        for (const x of [] as TResult[]) {
            yield x
        }
    }
    return new BasicEnumerable(iterator)
}
