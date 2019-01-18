import { IAsyncParallel, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"

/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export function whereAsync<TSource>(
    source: IAsyncParallel<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>) {
    const generator = async () => {
        const values = await source.toArray()
        const valuesAsync = values.map(async (x, i) => {
            const keep = await predicate(x, i)
            return {
                keep,
                x,
            }
        })
        const filteredValues = []
        for (const value of await Promise.all(valuesAsync)) {
            if (value.keep) {
                filteredValues.push(value.x)
            }
        }
        return filteredValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
