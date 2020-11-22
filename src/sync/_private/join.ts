import { StrictEqualityComparer } from "../../shared"
import { IEnumerable, IEqualityComparer } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

// TODO: join Async

/**
 * Correlates the elements of two sequences based on matching keys.
 * A specified IEqualityComparer<T> is used to compare keys or the strict equality comparer.
 * @param outer The first sequence to join.
 * @param inner The sequence to join to the first sequence.
 * @param outerKeySelector A function to extract the join key from each element of the first sequence.
 * @param innerKeySelector A function to extract the join key from each element of the second sequence.
 * @param resultSelector A function to create a result element from two matching elements.
 * @param comparer An IEqualityComparer<T> to hash and compare keys. Optional.
 * @returns An IEnumerable<T> that has elements of type TResult that
 * are obtained by performing an inner join on two sequences.
 */
export const join = <TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IEnumerable<TResult> => {
    function *iterator(): IterableIterator<TResult> {
        const innerArray = [...inner]
        for (const o of outer) {
            const outerKey = outerKeySelector(o)

            for (const i of innerArray) {
                const innerKey = innerKeySelector(i)
                if (comparer(outerKey, innerKey) === true) {
                    yield resultSelector(o, i)
                }
            }
        }
    }

    return new BasicEnumerable(iterator)
}
