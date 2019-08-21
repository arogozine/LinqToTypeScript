import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * Applies an accumulator function over a sequence.
 * @param source An IEnumerable<T> to aggregate over.
 * @param func An accumulator function to be invoked on each element.
 * @returns The final accumulator value.
 */
export function aggregate<TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): Promise<TSource>
/**
 * Applies an accumulator function over a sequence.
 * The specified seed value is used as the initial accumulator value.
 * @param source An IEnumerable<T> to aggregate over.
 * @param seed The initial accumulator value.
 * @param func An accumulator function to be invoked on each element.
 * @returns The final accumulator value.
 */
export function aggregate<TSource, TAccumulate>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate>
/**
 * Applies an accumulator function over a sequence.
 * The specified seed value is used as the initial accumulator value,
 * and the specified function is used to select the result value.
 * @param source An IEnumerable<T> to aggregate over.
 * @param seed The initial accumulator value.
 * @param func An accumulator function to be invoked on each element.
 * @param resultSelector A function to transform the final accumulator value into the result value.
 * @returns The transformed final accumulator value.
 */
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

        return aggregate3(source, seedOrFunc as TAccumulate, func, resultSelector)
    } else if (func) {
        return aggregate2(source, seedOrFunc as TAccumulate, func)
    } else {
        return aggregate1(source, seedOrFunc as ((x: TSource, y: TSource) => TSource))
    }
}

const aggregate1 = async <TSource>(
    source: AsyncIterable<TSource>,
    func: (x: TSource, y: TSource) => TSource): Promise<TSource> => {
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

const aggregate2 = async <TSource, TAccumulate>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate): Promise<TAccumulate> => {
    let aggregateValue = seed

    for await (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return aggregateValue
}

const aggregate3 = async <TSource, TAccumulate, TResult>(
    source: AsyncIterable<TSource>,
    seed: TAccumulate,
    func: (x: TAccumulate, y: TSource) => TAccumulate,
    resultSelector: (x: TAccumulate) => TResult): Promise<TResult> => {
    let aggregateValue = seed

    for await (const value of source) {
        aggregateValue = func(aggregateValue, value)
    }

    return resultSelector(aggregateValue)
}
