import { ErrorString, InvalidOperationException } from "../../shared"

export const first = <TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> => {
    if (predicate) {
        return first2(source, predicate)
    } else {
        return first1(source)
    }
}

const first1 = async <T>(source: AsyncIterable<T>) => {
    const firstElement = await source[Symbol.asyncIterator]().next()

    if (firstElement.done === true) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return firstElement.value
}

const first2 = async <T>(source: AsyncIterable<T>, predicate: (x: T) => boolean) => {
    for await (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    throw new InvalidOperationException(ErrorString.NoMatch)
}
