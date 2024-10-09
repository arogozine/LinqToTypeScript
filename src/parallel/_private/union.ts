import { type IAsyncParallel, type IEqualityComparer, type IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

export const union = <TSource>(
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer?: IEqualityComparer<TSource>): IParallelEnumerable<TSource> => {
    if (comparer) {
        return union2(first, second, comparer)
    } else {
        return union1(first, second)
    }
}

const union1 = <TSource>(
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>) => {

    const generator = async () => {

        const set = new Set<TSource>()
        const secondPromise = second.toArray()

        for await (const item of first) {
            if (set.has(item) === false) {
                set.add(item)
            }
        }

        const secondValues = await secondPromise
        for (const item of secondValues) {
            if (set.has(item) === false) {
                set.add(item)
            }
        }

        return [... set.keys()]
    }

    return new BasicParallelEnumerable<TSource>({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}

const union2 = <TSource>(
    // eslint-disable-next-line no-shadow
    first: IAsyncParallel<TSource>,
    second: IAsyncParallel<TSource>,
    comparer: IEqualityComparer<TSource>) => {

    const generator = async () => {
        const result: TSource[] = []
        const values = await Promise.all([ first.toArray(), second.toArray() ])
        for (const source of values) {
            for (const value of source) {
                let exists = false

                for (const resultValue of result) {
                    if (comparer(value, resultValue) === true) {
                        exists = true
                        break
                    }
                }

                if (exists === false) {
                    result.push(value)
                }
            }
        }

        return result
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
