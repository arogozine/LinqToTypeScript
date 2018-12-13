import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { toArray } from "./toArray"

/**
 * Returns first element in sequence that satisfies predicate otherwise
 * returns the first element in the sequence. Returns null if no value found.
 * @param source An IParallelEnumerable<T> to return an element from.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The first element in the sequence
 * or the first element that passes the test in the specified predicate function.
 * Returns null if no value found.
 */
export function firstOrDefault<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> {
    if (predicate) {
        return firstOrDefault_2(source, predicate)
    } else {
        return firstOrDefault_1(source)
    }
}

async function firstOrDefault_1<TSource>(
    source: IParallelEnumerable<TSource>): Promise<TSource | null> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            if (values.length === 0) {
                return null
            } else {
                return values[0]
            }
        }
        case ParallelGeneratorType.ArrayOfPromises:
        {
            const promises = dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[0]
            }
        }
        case ParallelGeneratorType.PromiseOfPromises:
        {
            const promises = await dataFunc.generator()
            if (promises.length === 0) {
                return null
            } else {
                return await promises[0]
            }
        }
    }
}

async function firstOrDefault_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> {
    const data = await toArray(source)
    for (const value of data) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}
