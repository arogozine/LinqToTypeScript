import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

/**
 * Concatenates two sequences.
 * @param first The first sequence to concatenate.
 * @param second The sequence to concatenate to the first sequence.
 * @returns An IEnumerable<T> that contains the concatenated elements of the two input sequences.
 */
export function concat<TSource>(first: Iterable<TSource>, second: IEnumerable<TSource>): IEnumerable<TSource> {
    function* iterator() {
        yield* first
        yield* second
    }

    return new BasicEnumerable(iterator)
}
