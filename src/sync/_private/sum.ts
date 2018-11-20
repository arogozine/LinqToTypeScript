export function sum(source: Iterable<number>): number
export function sum<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
export function sum<TSource>(
    source: Iterable<number> | Iterable<TSource>,
    selector?: (x: TSource) => number): number {

    if (selector) {
        return sum_2(source as Iterable<TSource>, selector)
    } else {
        return sum_1(source as Iterable<number>)
    }
}

function sum_1(source: Iterable<number>): number {
    let total = 0
    for (const value of source) {
        total += value
    }

    return total
}

function sum_2<TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number {
    let total = 0
    for (const value of source) {
        total += selector(value)
    }

    return total
}
