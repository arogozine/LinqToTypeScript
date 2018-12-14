import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An IParallelEnumerable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
export function last<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return last_2(source, predicate)
    } else {
        return last_1(source)
    }
}

async function last_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return values[values.length - 1]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return await promises[promises.length - 1]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                throw new InvalidOperationException(ErrorString.NoElements)
            } else {
                return await promises[promises.length - 1]
            }
        }
    }
}

async function last_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            // Promise Array - Predicate
            for (let i = values.length - 1; i >= 0; i--) {
                const value = values[i]
                if (predicate(value)) {
                    return value
                }
            }
            break
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            // Promise Array - Predicate
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (predicate(value)) {
                    return value
                }
            }
            break
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            // Promise Array - Predicate
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (predicate(value)) {
                    return value
                }
            }
            break
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
