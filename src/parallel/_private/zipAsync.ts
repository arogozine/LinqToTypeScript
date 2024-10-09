import { type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const zipAsync = <TFirst, TSecond, TResult>(
    first: IAsyncParallel<TFirst>,
    second: IAsyncParallel<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => Promise<TResult>): IParallelEnumerable<TResult> => {
    const generator = async () => {
        const [left, right] = await Promise.all([first.toArray(), second.toArray()])
        const minLength = left.length < right.length ? left.length : right.length
        const resultPromises = new Array<Promise<TResult>>(minLength)
        for (let i = 0; i < minLength; i++) {
            const a = left[i]
            const b = right[i]
            resultPromises[i] = resultSelector(a, b)
        }
        return Promise.all(resultPromises)
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
