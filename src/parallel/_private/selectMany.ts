import { IParallelEnumerable, ParallelGeneratorType, TypedData } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"
import { nextIterationWithIndex } from "./_nextIterationWithIndex"

/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A transform function to apply to each element.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * one-to-many transform function on each element of the input sequence.
 */
export function selectMany<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource, index: number) => Iterable<OUT>): IParallelEnumerable<OUT>
/**
 * Projects each element of a sequence to an IParallelEnumerable<T>
 * and flattens the resulting sequences into one sequence.
 * @param source A sequence of values to project.
 * @param selector A string key of TSource.
 * @returns An IParallelEnumerable<T> whose elements are the result of invoking the
 * parameter the key is tried to on each element of the input sequence.
 */
export function selectMany<TBindedSource extends { [key: string]: Iterable<TOut> }, TOut>(
    source: IParallelEnumerable<TBindedSource>, selector: keyof TBindedSource): IParallelEnumerable<TOut>
export function selectMany<TSource, OUT>(
    source: IParallelEnumerable<TSource>,
    selector: ((x: TSource, index: number) => Iterable<OUT>) | keyof TSource): IParallelEnumerable<any> {
    const generator = async () => {
        let values: TypedData<Iterable<OUT>>
        if (typeof selector === "function") {
            if (selector.length === 1) {
                values = await nextIteration(source, selector as (x: TSource) => Iterable<OUT>)
            } else {
                values = await nextIterationWithIndex(source, selector)
            }
        } else {
            values = await nextIteration(source, (x: any) => x[selector])
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
