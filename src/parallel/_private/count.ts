import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Returns the number of elements in a sequence
 * or represents how many elements in the specified sequence satisfy a condition
 * if the predicate is specified.
 * @param source A sequence that contains elements to be counted.
 * @param predicate A function to test each element for a condition. Optional.
 */
export function count<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<number> {
    if (predicate) {
        return count_2(source, predicate)
    } else {
        return count_1(source)
    }
}

async function count_1<TSource>(source: IParallelEnumerable<TSource>): Promise<number> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        case ParallelGeneratorType.PromiseOfPromises:
            const arrayData = await source.toArray()
            return arrayData.length
        case ParallelGeneratorType.ArrayOfPromises:
            const promises = dataFunc.generator()
            return promises.length
    }
}

export async function count_2<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<number> {
    const values = await source.toArray()
    let totalCount = 0
    for (let i = 0; i < values.length; i++) {
        if (predicate(values[i]) === true) {
            totalCount ++
        }
    }
    return totalCount
}