import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} No Elements / No Match
 */
export async function last<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return last_2(source, predicate)
    } else {
        return last_1(source)
    }
}

export async function last_1<T>(source: AsyncIterable<T>): Promise<T> {
    let lastItem: T | null = null

    for await (const value of source) {
        lastItem = value
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return lastItem
}

export async function last_2<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource> {
    let lastItem: TSource | null = null

    for await (const value of source) {
        if (predicate(value) === true) {
            lastItem = value
        }
    }

    if (!lastItem) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return lastItem
}
