import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

export function concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource> {
    function* iterator() {
        yield* first
        yield* second
    }

    return new BasicEnumerable(iterator)
}
