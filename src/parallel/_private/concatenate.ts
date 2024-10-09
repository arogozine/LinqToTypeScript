import { type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const concatenate = <TSource>(
    first: IAsyncParallel<TSource>, second: IAsyncParallel<TSource>): IParallelEnumerable<TSource> => {
    const generator = async () => {
        const [firstData, secondData] = await Promise.all([ first.toArray(), second.toArray() ])
        return [...firstData, ...secondData]
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
