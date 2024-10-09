import { type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const where = <TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => boolean): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const values = await source.toArray()
        return values.filter(predicate)
    }
    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
