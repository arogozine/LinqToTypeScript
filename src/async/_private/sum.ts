/**
 * Computes the sum of a sequence of values.
 * @param source A sequence of values to calculate the sum of.
 * @returns The sum of the values in the sequence.
 */
export function sum(
    source: AsyncIterable<number>): Promise<number>
/**
 * Computes the sum of the sequence of values
 * that are obtained by invoking a transform function on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export function sum<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
export function sum<TSource>(
    source: AsyncIterable<number> | AsyncIterable<TSource>,
    selector?: (x: TSource) => number): Promise<number> {

    if (selector) {
        return sum_2(source as AsyncIterable<TSource>, selector)
    } else {
        return sum_1(source as AsyncIterable<number>)
    }
}

async function sum_1(
    source: AsyncIterable<number>): Promise<number> {
    let total = 0
    for await (const value of source) {
        total += value
    }

    return total
}

async function sum_2<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number> {
    let total = 0
    for await (const value of source) {
        total += selector(value)
    }

    return total
}
