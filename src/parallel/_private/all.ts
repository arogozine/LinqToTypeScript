import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIteration } from "./_nextIteration"

/**
 * Determines whether all elements of a sequence satisfy a condition.
 * @param source An IParallelEnumerable<T> that contains the elements to apply the predicate to.
 * @param predicate A function to test each element for a condition.
 * @returns ``true`` if every element of the source sequence passes the test in the specified predicate,
 * or if the sequence is empty; otherwise, ``false``.
 */
export function all<TSource>(
    source: IParallelEnumerable<TSource>,
    predicate: (x: TSource) => boolean): Promise<boolean> {
    const nextIter = nextIteration(source, (x) => {
        if (!predicate(x)) {
            throw new Error(String(false))
        }
        return true
    })

    switch (nextIter.type) {
        case ParallelGeneratorType.PromiseToArray:
            return nextIter.generator()
                .then(() => true, () => false)
        case ParallelGeneratorType.ArrayOfPromises:
            return Promise.all(nextIter.generator())
                .then(() => true, () => false)
        case ParallelGeneratorType.PromiseOfPromises:
            return nextIter.generator()
                .then(Promise.all.bind(Promise))
                .then(() => true, () => false)
    }
}
