import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable } from "../../types/IParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export const minAsync = async <TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> => {
    const dataFunc = nextIterationAsync(source, selector)
    const maxInfo = await typeDataToArray(dataFunc)

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.min.apply(null, maxInfo)
}
