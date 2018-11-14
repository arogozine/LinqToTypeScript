import { ErrorString, IAsyncParallel, InvalidOperationException } from "../shared/shared"

// tslint:disable:completed-docs

export async function aggregate_1<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): Promise<TSource> {
    let aggregateValue: TSource | undefined

    for await (const value of source) {
        if (aggregateValue) {
            aggregateValue = func(aggregateValue, value)
        } else {
            aggregateValue = value
        }
    }

    if (aggregateValue === undefined) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return aggregateValue
}

export async function aggregate_2<TSource, TAccumulate>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate> {
    let aggregateValue = seed

    for await (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return aggregateValue
}

export async function aggregate_3<TSource, TAccumulate, TResult>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): Promise<TResult> {
    let aggregateValue = seed

    for await (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return resultSelector(aggregateValue)
}

export async function average_1(source: IAsyncParallel<number>): Promise<number> {
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

export async function average_2<TSource>(
    source: IAsyncParallel<TSource>, func: (x: TSource) => number): Promise<number> {
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
