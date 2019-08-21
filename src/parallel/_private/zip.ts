import { IAsyncParallel, IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Creates tuples from th corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @returns An IParallelEnumerable<T> that contains merged elements of two input sequences.
 */
export function zip<TFirst, TSecond>(
    first: IAsyncParallel<TFirst>,
    second: IAsyncParallel<TSecond>): IParallelEnumerable<[TFirst, TSecond]>
/**
 * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
 * @param first The first sequence to merge.
 * @param second The second sequence to merge.
 * @param resultSelector A function that specifies how to merge the elements from the two sequences.
 * @returns An IParallelEnumerable<T> that contains merged elements of two input sequences.
 */
export function zip<TFirst, TSecond, TResult>(
    first: IAsyncParallel<TFirst>,
    second: IAsyncParallel<TSecond>,
    resultSelector: (x: TFirst, y: TSecond) => TResult): IParallelEnumerable<TResult>
export function zip<TFirst, TSecond, TResult>(
    first: IAsyncParallel<TFirst>,
    second: IAsyncParallel<TSecond>,
    resultSelector?: (x: TFirst, y: TSecond) => TResult)
    : IParallelEnumerable<TResult> | IParallelEnumerable<[TFirst, TSecond]> {
    if (resultSelector) {
        return zip2(first, second, resultSelector)
    } else {
        return zip1(first, second)
    }
}

const zip1 = <T, Y>(
    source: IAsyncParallel<T>,
    second: IAsyncParallel<Y>): IParallelEnumerable<[T, Y]> => {
    async function generator() {
        const [left, right] = await Promise.all([source.toArray(), second.toArray()])
        const maxLength = left.length > right.length ? left.length : right.length
        const results = new Array<[T, Y]>(maxLength)
        for (let i = 0; i < maxLength; i++) {
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
    async function generator() {
        const [left, right] = await Promise.all([source.toArray(), second.toArray()])
        const maxLength = left.length > right.length ? left.length : right.length
        const results = new Array<OUT>(maxLength)
        for (let i = 0; i < maxLength; i++) {
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
