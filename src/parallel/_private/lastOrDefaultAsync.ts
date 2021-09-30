import { IParallelEnumerable, ParallelGeneratorType } from "../../types"

/**
 * Returns the last element of a sequence that satisfies a specified condition.
 * @param source An IParallelEnumerable<T> to return the last element of.
 * @param predicate A function to test each element for a condition.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 * Null if no elements.
 */
export const lastOrDefaultAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource | null> => {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray: {
            const values = await dataFunc.generator()
            for (let i = values.length - 1; i >= 0; i--) {
                const value = values[i]
                if (await predicate(value) === true) {
                    return value
                }
            }

            break
        }
        case ParallelGeneratorType.ArrayOfPromises: {
            const promises = dataFunc.generator()
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (await predicate(value) === true) {
                    return value
                }
            }

            break
        }
        case ParallelGeneratorType.PromiseOfPromises: {
            const promises = await dataFunc.generator()
            for (let i = promises.length - 1; i >= 0; i--) {
                const value = await promises[i]
                if (await predicate(value) === true) {
                    return value
                }
            }

            break
        }
    }

    return null
}
