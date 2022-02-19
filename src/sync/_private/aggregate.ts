import { ErrorString, InvalidOperationException } from "../../shared"

type AggregateFunc = {
    <TSource>(
        source: Iterable<TSource>,
        func: (x: TSource, y: TSource) => TSource): TSource
    <TSource, TAccumulate>(
        source: Iterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate
    <TSource, TAccumulate, TResult>(
        source: Iterable<TSource>,
        seed: TAccumulate,
        func: (x: TAccumulate, y: TSource) => TAccumulate,
        resultSelector: (x: TAccumulate) => TResult): TResult
}

export const aggregate: AggregateFunc = <TSource, TAccumulate, TResult>(
    source: Iterable<TSource>,
    seedOrFunc: ((x: TSource, y: TSource) => TSource) | TAccumulate,
    func?: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector?: (x: TAccumulate) => TResult): TSource | TAccumulate | TResult | null => {
    if (resultSelector) {
        if (!func) {
            throw new ReferenceError("TAccumulate function is undefined")
        }

        return aggregate3(source, seedOrFunc as TAccumulate, func, resultSelector)
    } else if (func) {
        return aggregate2(source, seedOrFunc as TAccumulate, func)
    } else {
        return aggregate1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
    }
}

const aggregate1 = <TSource>(
    source: Iterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): TSource | null => {
    let aggregateValue: TSource | undefined

    for (const value of source) {
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

const aggregate2 = <TSource, TAccumulate>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): TAccumulate => {
    let aggregateValue = seed

    for (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return aggregateValue
}

const aggregate3 = <TSource, TAccumulate, TResult>(
    source: Iterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): TResult => {
    let aggregateValue = seed

    for (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return resultSelector(aggregateValue)
}
