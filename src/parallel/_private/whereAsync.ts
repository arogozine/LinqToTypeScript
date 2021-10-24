import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationWithIndexAsync } from "./_nextIterationWithIndexAsync"
import { typeDataToArray } from "./_typeDataToArray"
/**
 * Filters a sequence of values based on a predicate.
 * Each element's index is used in the logic of the predicate function.
 * @param source An IAsyncParallel<T> to filter.
 * @param predicate A async function to test each source element for a condition;
 * the second parameter of the function represents the index of the source element.
 * @returns An IParallelEnumerable<T> that contains elements from the input sequence that satisfy the condition.
 */
export const whereAsync = <TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource, index: number) => Promise<boolean>) => {
    const generator = async () => {
        const dataFunc = nextIterationWithIndexAsync(source, async (value, index) => {
            const keep = await predicate(value, index)
            return [keep, value] as [boolean, TSource]
        })
        const valuesAsync = await typeDataToArray(dataFunc)

        const filteredValues = []
        for (const [keep, value] of valuesAsync) {
            if (keep) {
                filteredValues.push(value)
            }
        }
        return filteredValues
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
