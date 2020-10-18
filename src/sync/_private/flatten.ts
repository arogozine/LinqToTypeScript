import { IEnumerable, IFlatten } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Flattens an iterable
 * @param source Iterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export function flatten<TSource>(
    source: IFlatten<TSource>, shallow?: false): IEnumerable<TSource>
/**
 * Flattens an iterable
 * @param source Iterable to flatten
 * @param shallow When false - recurses the iterable types
 */
export function flatten<TSource>(
    source: IFlatten<TSource>, shallow: true): IEnumerable<TSource | Iterable<TSource>>
export function flatten<TSource>(
    source: IFlatten<TSource>, shallow?: boolean): IEnumerable<TSource | Iterable<TSource>> {

    // eslint-disable-next-line no-shadow
    function* iterator(source: Iterable<any>): IterableIterator<TSource | Iterable<TSource>> {
        for (const item of source) {
            // JS string is an Iterable.
            // We exclude it from being flattened
            if (item[Symbol.iterator] !== undefined && typeof item !== "string") {
                yield* shallow ? item : iterator(item)
            } else {
                yield item
            }
        }
    }

    return new BasicEnumerable(() => iterator(source))
}
