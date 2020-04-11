import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IParallelEnumerable, ParallelGeneratorType } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"

/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 */
export async function averageAsync<TSource>(
    source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> {
    const nextIter = nextIterationAsync(source, selector)
    // tslint:disable-next-line: array-type
    let values: Array<number | Promise<number>>
    switch (nextIter.type) {
        case ParallelGeneratorType.ArrayOfPromises:
            values = nextIter.generator()
            break
        case ParallelGeneratorType.PromiseOfPromises:
            values = await nextIter.generator()
            break
        case ParallelGeneratorType.PromiseToArray:
        default:
            values = await nextIter.generator()
            break
    }

    if (values.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    let value = 0
    for (const selectedValue of values) {
        value += await selectedValue
    }

    return value / values.length
}
