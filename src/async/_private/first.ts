import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} There are no elements
 */
export function first<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return first_2(source, predicate)
    } else {
        return first_1(source)
    }
}

export async function first_1<T>(source: AsyncIterable<T>): Promise<T> {
    const firstElement = await source[Symbol.asyncIterator]().next()

    if (firstElement.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return firstElement.value
}

export async function first_2<T>(source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T> {
    for await (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
