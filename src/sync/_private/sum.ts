/**
 * Computes the sum of the sequence of numeric values.
 * @param source A sequence of numeric values to calculate the sum of.
 * @returns The sum of the values in the sequence.
 */
export function sum(source: Iterable<number>): number
/**
 * Computes the sum of the sequence of numeric values that are obtained by invoking a transform function
 * on each element of the input sequence.
 * @param source A sequence of values that are used to calculate a sum.
 * @param selector A transform function to apply to each element.
 * @returns The sum of the projected values.
 */
export function sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function sum<TSource>(
    source: Iterable<number> | Iterable<TSource>,
    selector?: (x: TSource) => number): number {

    if (selector) {
        return sum2(source as Iterable<TSource>, selector)
    } else {
        return sum1(source as Iterable<number>)
    }
}

const sum1 = (source: Iterable<number>): number => {
    let total = 0
    for (const value of source) {
        total += value
    }

    return total
}

const sum2 = <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number => {
    let total = 0
    for (const value of source) {
        total += selector(value)
    }

    return total
}
