import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

/**
 * Reverses an Iterable
 * @param source Iterable
 */
export function reverse<TSource>(source: Iterable<TSource>): IEnumerable<TSource> {
    function* iterator() {
        for (const x of [...source].reverse()) {
            yield x
        }
    }

    return new BasicEnumerable(iterator)
}
