import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IParallelEnumerable } from "../../types"
import { ParallelGeneratorType } from "../../types/ParallelGeneratorType"

/**
 * Returns the last element of a sequence that satisfies a specified condition.
 * @param source An IParallelEnumerable<T> to return the last element of.
 * @param predicate A function to test each element for a condition.
 * @throws {InvalidOperationException} The source sequence is empty.
 * @returns The last element in the sequence that passes the test in the specified predicate function.
 */
export async function lastAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => Promise<boolean>): Promise<TSource> {
    const dataFunc = source.dataFunc
    switch (dataFunc.type) {
        case ParallelGeneratorType.PromiseToArray:
        {
            const values = await dataFunc.generator()
            // Promise Array - Predicate
            for (let i = values.length - 1; i >= 0; i--) {
                const value = values[i]
                if (await predicate(value) === true) {
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
                if (await predicate(value) === true) {
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
                if (await predicate(value) === true) {
                    return value
                }
            }
            break
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
