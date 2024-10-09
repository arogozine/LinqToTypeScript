import { StrictEqualityComparer } from "../../shared"
import { type IAsyncParallel, type IEqualityComparer, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const join = <TOuter, TInner, TKey, TResult>(
    outer: IAsyncParallel<TOuter>,
    inner: IAsyncParallel<TInner>,
    outerKeySelector: (x: TOuter) => TKey,
    innerKeySelector: (x: TInner) => TKey,
    resultSelector: (x: TOuter, y: TInner) => TResult,
    comparer: IEqualityComparer<TKey> = StrictEqualityComparer): IParallelEnumerable<TResult> => {
    const generator = async () => {
        const [innerArray, outerArray] = await Promise.all([inner.toArray(), outer.toArray()])

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
