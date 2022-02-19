type SumFunc = {
    (source: AsyncIterable<number>): Promise<number>
    <TSource>(source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number>
}


export const sum: SumFunc = <TSource>(
    source: AsyncIterable<number> | AsyncIterable<TSource>,
    selector?: (x: TSource) => number): Promise<number> => {

    if (selector) {
        return sum2(source as AsyncIterable<TSource>, selector)
    } else {
        return sum1(source as AsyncIterable<number>)
    }
}

const sum1 = async (
    source: AsyncIterable<number>): Promise<number> => {
    let total = 0
    for await (const value of source) {
        total += value
    }

    return total
}

const sum2 = async<TSource>(
    source: AsyncIterable<TSource>, selector: (x: TSource) => number): Promise<number> => {
    let total = 0
    for await (const value of source) {
        total += selector(value)
    }

    return total
}
