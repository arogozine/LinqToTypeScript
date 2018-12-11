import { IAsyncParallel } from "../../types"

/**
 * Computes the sum of a sequence of values.
 * @param source A sequence of values to calculate the sum of.
 * @returns The sum of the values in the sequence.
 */
export function sum(
    source: IAsyncParallel<number>): Promise<number>
/**
 * Computes the sum of the sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export function sum<TSource>(
    source: IAsyncParallel<TSource>,
    selector: (x: TSource) => number): Promise<number>
export function sum<TSource>(
    source: IAsyncParallel<TSource> | IAsyncParallel<number>,
    selector?: (x: TSource) => number): Promise<number> {

    if (selector) {
        return sum_2(source as IAsyncParallel<TSource>, selector)
    } else {
        return sum_1(source as IAsyncParallel<number>)
    }
}

async function sum_1(
    source: IAsyncParallel<number>): Promise<number> {
    let totalSum = 0
    for (const value of await source.toArray()) {
        totalSum += value
    }

    return totalSum
}

async function sum_2<TSource>(
    source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number> {
    let total = 0
    for (const value of await source.toArray()) {
        total += selector(value)
    }

    return total
}
