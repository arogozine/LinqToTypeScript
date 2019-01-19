import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IParallelEnumerable } from "../../types"
import { BasicParallelEnumerable } from "../BasicParallelEnumerable"
import { nextIteration } from "./_nextIteration"

/**
 * Returns the minimum value in a sequence of values.
 * @param source A sequence of values to determine the minimum value of.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export async function min(
    source: IParallelEnumerable<number>): Promise<number>
/**
 * Invokes a transform function on each element of a sequence and returns the minimum value.
 * @param source A sequence of values to determine the minimum value of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 * @returns The minimum value in the sequence.
 */
export async function min<TSource>(
    source: IParallelEnumerable<TSource>,
    selector: (x: TSource) => number): Promise<number>
export async function min<TSource>(
    source: IParallelEnumerable<TSource>,
    selector?: (x: TSource) => number): Promise<number> {
    let minInfo: any[]
    if (selector) {
        const dataFunc = nextIteration(source, selector)
        minInfo = await new BasicParallelEnumerable(dataFunc)
            .toArray()
    } else {
        minInfo = await source.toArray()
    }

    if (minInfo.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.min.apply(null, minInfo)
}
