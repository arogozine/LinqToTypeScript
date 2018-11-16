import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

export function flatten<TSource>(source: Iterable<TSource | Iterable<TSource>>): IEnumerable<TSource>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow: false): IEnumerable<TSource>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow: true): IEnumerable<TSource | Iterable<TSource>>
export function flatten<TSource>(
    source: Iterable<TSource | Iterable<TSource>>, shallow?: boolean): IEnumerable<TSource | Iterable<TSource>> {

    // tslint:disable-next-line:no-shadowed-variable
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
