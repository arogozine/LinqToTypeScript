import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"
import { IAsyncParallel } from "../../types"

/**
 * Computes the average of a sequence of number values.
 * @param source A sequence of values to calculate the average of.
 * @throws {InvalidOperationException} source contains no elements.
 */
export function average(
    source: IAsyncParallel<number>): Promise<number>
/**
 * Computes the average of a sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values to calculate the average of.
 * @param selector A transform function to apply to each element.
 * @throws {InvalidOperationException} source contains no elements.
 */
export function average<TSource>(
    source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number>
export function average<TSource>(
    source: IAsyncParallel<TSource> | IAsyncParallel<number>,
    selector?: (x: TSource) => number): Promise<number> {
    if (selector) {
        return average2(source as IAsyncParallel<TSource>, selector)
    } else {
        return average1(source as IAsyncParallel<number>)
    }
}

const average1 = async (source: IAsyncParallel<number>): Promise<number> => {
    let value: number | undefined
    let itemCount: number | undefined
    for (const item of await source.toArray()) {
        value = (value || 0) + item
        itemCount = (itemCount || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (itemCount as number)
}

const average2 = async <TSource>(
    source: IAsyncParallel<TSource>, func: (x: TSource) => number): Promise<number> => {
    let value: number | undefined
    // tslint:disable-next-line:no-shadowed-variable
    let count: number | undefined
    for (const item of await source.toArray()) {
        value = (value || 0) + func(item)
        count = (count || 0) + 1
    }

    if (value === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return value / (count as number)
}
