import { IAsyncParallel } from "../../types"

type SumFunc = {
    (source: IAsyncParallel<number>): Promise<number>
    <TSource>(
        source: IAsyncParallel<TSource>,
        selector: (x: TSource) => number): Promise<number>
}


export const sum: SumFunc = <TSource>(
    source: IAsyncParallel<TSource> | IAsyncParallel<number>,
    selector?: (x: TSource) => number): Promise<number> => {

    if (selector) {
        return sum2(source as IAsyncParallel<TSource>, selector)
    } else {
        return sum1(source as IAsyncParallel<number>)
    }
}

const sum1 = async (
    source: IAsyncParallel<number>): Promise<number> => {
    let totalSum = 0
    for (const value of await source.toArray()) {
        totalSum += value
    }

    return totalSum
}

const sum2 = async <TSource>(
    source: IAsyncParallel<TSource>, selector: (x: TSource) => number): Promise<number> => {
    let total = 0
    for (const value of await source.toArray()) {
        total += selector(value)
    }

    return total
}
