import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

/**
 * Determines whether any element of a sequence satisfies a condition.
 * @param source An IParallelEnumerable<T> whose elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns Whether or not the parallel sequence contains any value (from the predicate)
 */
export function anyAsync<TSource>(
    source: IParallelEnumerable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<boolean> {
    const nextIter = nextIterationAsync(source, predicate)

    switch (nextIter.type) {
        case ParallelGeneratorType.PromiseToArray:
            return nextIter.generator().then((values) => {
                return values.some((x) => x)
            })
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(nextIter.generator()).then((values) => {
                return values.some((x) => x)
            })
        case ParallelGeneratorType.PromiseOfPromises:
            return nextIter.generator().then((values) => Promise.all(values)).then((values) => {
                return values.some((x) => x)
            })
    }
}
