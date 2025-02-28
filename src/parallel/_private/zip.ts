import { type IAsyncParallel, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

type ZipFunc = {
    <TFirst, TSecond>(
        first: IAsyncParallel<TFirst>,
        second: IAsyncParallel<TSecond>): IParallelEnumerable<[TFirst, TSecond]>
    <TFirst, TSecond, TResult>(
        first: IAsyncParallel<TFirst>,
        second: IAsyncParallel<TSecond>,
        resultSelector: (x: TFirst, y: TSecond) => TResult): IParallelEnumerable<TResult>
}

export const zip: ZipFunc = <TFirst, TSecond, TResult>(
    first: IAsyncParallel<TFirst>,
    second: IAsyncParallel<TSecond>,
    resultSelector?: (x: TFirst, y: TSecond) => TResult)
    : IParallelEnumerable<TResult> | IParallelEnumerable<[TFirst, TSecond]> => {
    if (resultSelector) {
        return zip2(first, second, resultSelector)
    } else {
        return zip1(first, second)
    }
}

const zip1 = <T, Y>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>): IParallelEnumerable<[T, Y]> => {
    const generator = async () => {
        const [left, right] = await Promise.all([source.toArray(), second.toArray()])
        const minLength = left.length < right.length ? left.length : right.length
        const results = new Array<[T, Y]>(minLength)
        for (let i = 0; i < minLength; i++) {
            const a = left[i]
            const b = right[i]
            results[i] = [a, b]
        }
        return results
    }
    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

const zip2 = <T, Y, OUT>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>,
    resultSelector: (x: T, y: Y) => OUT): IParallelEnumerable<OUT> => {
    const generator = async () => {
        const [left, right] = await Promise.all([source.toArray(), second.toArray()])
        const minLength = left.length < right.length ? left.length : right.length
        const results = new Array<OUT>(minLength)
        for (let i = 0; i < minLength; i++) {
            const a = left[i]
            const b = right[i]
            results[i] = resultSelector(a, b)
        }
        return results
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
