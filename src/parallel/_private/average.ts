import { ErrorString, InvalidOperationException } from "../../shared"
import { IParallelEnumerable, TypedData } from "../../types"
import { nextIteration } from "./_nextIteration"
import { typeDataToArray } from "./_typeDataToArray"

/**
 * Computes the average of a sequence of number values.
 * @param source A sequence of values to calculate the average of.
 * @throws {InvalidOperationException} source contains no elements.
 */
export function average(
    source: IParallelEnumerable<number>): Promise<number>
/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 */
export function average<TSource>(
    source: IParallelEnumerable<TSource>, selector: (x: TSource) => number): Promise<number>
export async function average<TSource>(
    source: IParallelEnumerable<TSource> | IParallelEnumerable<number>,
    selector?: (x: TSource) => number): Promise<number> {

    let data: TypedData<number>

    if (selector) {
        data = nextIteration(source as IParallelEnumerable<TSource>, selector)
    } else {
        data = source.dataFunc as TypedData<number>
    }

    const values = await typeDataToArray(data)

    if (values.length === 0) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    let sum = 0
    for (const item of values) {
        sum += item
    }

    return sum / values.length
}