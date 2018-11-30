import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIteration } from "./_nextIteration"

/**
 * Determines whether a sequence contains any elements.
 * If predicate is specified, determines whether any element of a sequence satisfies a condition.
 * @param source The IEnumerable<T> to check for emptiness or apply the predicate to.
 * @param predicate A function to test each element for a condition.
 */
export function any<TSource>(source: IParallelEnumerable<TSource>, predicate?: (x: TSource) => boolean) {
    const nextIter = nextIteration(source, predicate || ((_) => true))

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
