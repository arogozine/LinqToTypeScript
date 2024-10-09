import { type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const takeWhileAsync = <TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const values = await source.toArray()
        const results = new Array<TSource>()
        if (predicate.length === 1) {
            const sPredicate = predicate as (x: TSource) => Promise<boolean>
            for (const value of values) {
                if (await sPredicate(value) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        } else {
            for (let i = 0; i < values.length; i++) {
                const value = values[i]
                if (await predicate(value, i) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        }
        return results
    }

    return new BasicParallelEnumerable<TSource>({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
