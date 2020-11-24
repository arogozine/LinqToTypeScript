import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Creates an IEnumerable<T> from an array
 * @param source Array of Elements
 * @returns IEnumerable<T>
 */
export function from<TSource>(source: TSource[]): IEnumerable<TSource>
/**
 * Creates an IEnumerable<T> from an IterableIterator<T> of elements
 * @param source Iteration of Elements
 * @returns IEnumerable<T>
 */
export function from<TSource>(source: IterableIterator<TSource>): IEnumerable<TSource>
export function from<TSource>(source: TSource[] | IterableIterator<TSource>): IEnumerable<TSource> {
    if (Array.isArray(source)) {
        const iterator = function *() {
            for (const value of source) {
                yield value
            }
        }
        return new BasicEnumerable(iterator)
    } else {
        return new BasicEnumerable(() => source)
    }
}
