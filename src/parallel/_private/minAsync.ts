import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IParallelEnumerable } from "../../types/IParallelEnumerable"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIterationAsync } from "./_nextIterationAsync"

/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export async function minAsync<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> {
    const dataFunc = nextIterationAsync(source, selector)
    const maxInfo = await new BasicParallelEnumerable(dataFunc).toArray()

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.min.apply(null, maxInfo)
}
