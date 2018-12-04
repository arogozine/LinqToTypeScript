import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Returns an empty IEnumerable<TSource>
 */
export function empty<TSource>(): IEnumerable<TSource> {
    const iterator = function*() {
        for (const x of [] as TSource[]) {
            yield x
        }
    }
    return new BasicEnumerable(iterator)
}
