import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIteration } from "./_nextIteration"

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
