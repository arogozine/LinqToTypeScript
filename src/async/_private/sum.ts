export function sum(
    source: AsyncIterable<number>): Promise<number>
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
