import { IAsyncParallel } from "../../types"

export function sum(
    source: IAsyncParallel<number>): Promise<number>
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
