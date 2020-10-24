import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"

/**
 * Invokes an async transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export async function maxAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    const dataFunc = nextIterationAsync(source, selector)
    const maxInfo = await new BasicParallelEnumerable(dataFunc).toArray()

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.max.apply(null, maxInfo)
}
