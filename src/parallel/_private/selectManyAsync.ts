import { type IParallelEnumerable, ParallelGeneratorType, type TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"
import { nextIterationWithIndexAsync } from "./_nextIterationWithIndexAsync"

export const selectManyAsync = <TSource, TResult>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IParallelEnumerable<TResult> => {
    const generator = async () => {
        let values: TypedData<Iterable<TResult>>
        if (selector.length === 1) {
            values = nextIterationAsync(source, selector as (x: TSource) => Promise<Iterable<TResult>>)
        } else {
            values = nextIterationWithIndexAsync(source, selector)
        }

        const valuesArray = []
        switch (values.type) {
            case ParallelGeneratorType.ArrayOfPromises: {
                for (const outer of values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
            case ParallelGeneratorType.PromiseOfPromises: {
                for (const outer of await values.generator()) {
                    for (const y of await outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
        }
        return valuesArray
    }

    return new BasicParallelEnumerable({
        generator,
        type: ParallelGeneratorType.PromiseToArray,
    })
}
