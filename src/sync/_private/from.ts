import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

/**
 * Creates an IEnumerable from an array
 * @param source Array of Elements
 */
export function from<TSource>(source: TSource[]): IEnumerable<TSource>
/**
 * Creates an IEnumerable from an iteration of elements
 * @param source Iteration of Elements
 */
export function from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>
export function from<TSource>(source: TSource[] | IterableIterator<TSource>): IEnumerable<TSource> {
    if (Array.isArray(source)) {
        function *iterator() {
            for (const value of source) {
                yield value
            }
        }
        return new BasicEnumerable(iterator)
    } else {
        return new BasicEnumerable(() => source)
    }
}
