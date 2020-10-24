import { StrictEqualityComparer } from "../../shared"
import { IAsyncParallel, IEqualityComparer, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Correlates the elements of two sequences based on matching keys.
 * A specified IEqualityComparer<T> is used to compare keys or the strict equality comparer.
 * @param outer The first sequence to join.
 * @param inner The sequence to join to the first sequence.
 * @param outerKeySelector A function to extract the join key from each element of the first sequence.
 * @param innerKeySelector A function to extract the join key from each element of the second sequence.
 * @param resultSelector A function to create a result element from two matching elements.
 * @param comparer An IEqualityComparer<T> to hash and compare keys. Optional.
 * @returns An IParallelEnumerable<T> that has elements of type TResult that
 * are obtained by performing an inner join on two sequences.
 */
export function join<TOuter, TInner, TKey, TResult>(
    outer: IAsyncParallel<TOuter>,
    inner: IAsyncParallel<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IParallelEnumerable<TResult> {
    const generator = async () => {
        const innerOuter = await Promise.all([inner.toArray(), outer.toArray()])
        const innerArray = innerOuter[0]
        const outerArray = innerOuter[1]

        const results = new Array<TResult>()
        for (const o of outerArray) {
            const outerKey = outerKeySelector(o)

            for (const i of innerArray) {
                const innerKey = innerKeySelector(i)
                if (comparer(outerKey, innerKey) === true) {
                    results.push(resultSelector(o, i))
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
