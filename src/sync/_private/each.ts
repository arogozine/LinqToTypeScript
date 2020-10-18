import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Performs a specified action on each element of the Iterable<TSource>
 * @param source The source to iterate
 * @param action The action to take an each element
 * @returns A new IEnumerable<T> that executes the action lazily as you iterate.
 */
export const each: { <TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource> } = (source, action) => {

    /**
     * @internal
     */
    function *generator() {
        for (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicEnumerable(generator)
}
