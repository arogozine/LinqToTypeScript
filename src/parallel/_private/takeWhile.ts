import { type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const takeWhile = <TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const values = await source.toArray()
        const results = new Array<TSource>()
        if (predicate.length === 1) {
            for (const value of values) {
                if ((predicate as (x: TSource) => boolean)(value) === true) {
                    results.push(value)
                } else {
                    break
                }
            }
        } else {
            for (let i = 0; i < values.length; i++) {
                const value = values[i]
                if (predicate(value, i) === true) {
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
