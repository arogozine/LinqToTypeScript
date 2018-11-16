import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

/**
 * Empty Enumerable
 */
export function empty<TSource>(): IEnumerable<TSource> {
    const iterator = function*() {
        for (const x of [] as TSource[]) {
            yield x
        }
    }
    return new BasicEnumerable(iterator)
}
