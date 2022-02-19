type SumFunc = {
    (source: Iterable<number>): number
    <TSource>(source: Iterable<TSource>, selector: (x: TSource) => number): number
}


export const sum: SumFunc = <TSource>(
    source: Iterable<number> | Iterable<TSource>,
    selector?: (x: TSource) => number): number => {

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