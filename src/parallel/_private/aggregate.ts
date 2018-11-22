import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

export function aggregate<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): Promise<TSource>
export function aggregate<TSource, TAccumulate>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
export function aggregate<TSource, TAccumulate, TResult>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): Promise<TResult>
export function aggregate<TSource, TAccumulate, TResult>(
    source: AsyncIterable<TSource>,
    seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
    func?: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector?: (x: TAccumulate) => TResult): Promise<TSource | TAccumulate | TResult | null> {
    if (resultSelector) {
        if (!func) {
            throw new ReferenceError(`TAccumulate function is undefined`)
        }

        return aggregate_3(source, seedOrFunc as TAccumulate, func, resultSelector)
    } else if (func) {
        return aggregate_2(source, seedOrFunc as TAccumulate, func)
    } else {
        return aggregate_1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
    }
}

async function aggregate_1<TSource>(
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

async function aggregate_2<TSource, TAccumulate>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate> {
    let aggregateValue = seed

    for await (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return aggregateValue
}

async function aggregate_3<TSource, TAccumulate, TResult>(
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
