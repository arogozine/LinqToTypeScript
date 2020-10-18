import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"
import { nextIterationWithIndexAsync } from "./_nextIterationWithIndexAsync"

/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectManyAsync<TSource, TResult>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource, index: number) => Promise<Iterable<TResult>>): IParallelEnumerable<TResult> {
    const generator = async () => {
        let values: TypedData<Iterable<TResult>>
        if (selector.length === 1) {
            values = nextIterationAsync(source, selector as (x: TSource) => Promise<Iterable<TResult>>)
        } else {
            values = nextIterationWithIndexAsync(source, selector)
        }

        const valuesArray = []
        switch (values.type) {
            case ParallelGeneratorType.PromiseToArray: {
                for (const outer of await values.generator()) {
                    for (const y of outer) {
                        valuesArray.push(y)
                    }
                }

                break
            }
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
