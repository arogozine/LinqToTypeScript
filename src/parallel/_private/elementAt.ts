import { ArgumentOutOfRangeException } from "../../shared"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Returns the element at a specified index in a sequence.
 * @param source An IEnumerable<T> to return an element from.
 * @param index The zero-based index of the element to retrieve.
 * @throws {ArgumentOutOfRangeException}
 * index is less than 0 or greater than or equal to the number of elements in source.
 */
export async function elementAt<TSource>(
    source: IParallelEnumerable<TSource>,
    index: number): Promise<TSource> {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    const dataFunc = source.dataFunc

    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
            return dataFunc.generator().then((values) => {
                if (index >= values.length) {
                    throw new ArgumentOutOfRangeException("index")
                } else {
                    return values[index]
                }
            })
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(dataFunc.generator()).then((values) => {
                if (index >= values.length) {
                    throw new ArgumentOutOfRangeException("index")
                } else {
                    return values[index]
                }
            })
        case ParallelGeneratorType.PromiseOfPromises:
            return dataFunc.generator().then(async (values) => {
                if (index >= values.length) {
                    throw new ArgumentOutOfRangeException("index")
                } else {
                    return await values[index]
                }
            })
    }
}
