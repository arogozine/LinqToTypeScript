import type { IParallelEnumerable } from "../../types"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
 * on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 * @returns Sum of the sequence
 */
export const sumAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> => {

    const dataFunc = nextIterationAsync(source, selector)
    const values = await typeDataToArray(dataFunc)

    let sum = 0
    for (const value of values) {
        sum += value
    }

    return sum
}
