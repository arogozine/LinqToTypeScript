import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable, TypedData } from "../../types"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

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
    source: IParallelEnumerable<TSource> | IParallelEnumerable<number>,
    selector?: (x: TSource) => number): Promise<number> {

    let dataFunc : TypedData<number>
    if (selector) {
        dataFunc = nextIteration(source as IParallelEnumerable<TSource> , selector)
    } else {
        dataFunc = source.dataFunc as TypedData<number>
    }

    const data = await typeDataToArray(dataFunc)

    if (data.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return Math.max.apply(null, data)
}
