import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"

/**
 * Returns the maximum value in a sequence of values.
 * @param source A sequence of values to determine the maximum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export async function max(source: IParallelEnumerable<number>): Promise<number>
/**
 * Invokes a transform function on each element of a sequence and returns the maximum value.
 * @param source A sequence of values to determine the maximum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The maximum value in the sequence.
 */
export async function max<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => number): Promise<number>
export async function max<TSource>(
    source: IParallelEnumerable<TSource>,
    selector?: (x: TSource) => number): Promise<number> {
    let maxInfo: any[]
    if (selector) {
        const dataFunc = nextIteration(source, selector)
        maxInfo = await new BasicParallelEnumerable(dataFunc).toArray()
    } else {
        maxInfo = await source.toArray()
    }

    if (maxInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.max.apply(null, maxInfo)
}
