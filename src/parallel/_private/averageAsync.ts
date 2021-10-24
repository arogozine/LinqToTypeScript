import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns Average value (from the selector) of this parallel sequence
 */
export const averageAsync = async <TSource>(
    source: IParallelEnumerable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> => {
    const nextIter = nextIterationAsync(source, selector)
    const values = await typeDataToArray(nextIter)

    if (values.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    let value = 0
    for (const selectedValue of values) {
        value += selectedValue
    }

    return value / values.length
}
