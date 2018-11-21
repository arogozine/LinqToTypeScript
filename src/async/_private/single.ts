import { ErrorString, InvalidOperationException } from "../../shared/TypesAndHelpers"

/**
 * @throws {InvalidOperationException} More than One Element Found or No Matching Elements
 */
export function single<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource> {
    if (predicate) {
        return single_2(source, predicate)
    } else {
        return single_1(source)
    }
}

async function single_1<TSource>(source: AsyncIterable<TSource>): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (hasValue === true) {
            throw new InvalidOperationException(ErrorString.MoreThanOneElement)
        } else {
            hasValue = true
            singleValue = value
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return singleValue as TSource
}

async function single_2<TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<TSource> {
    let hasValue = false
    let singleValue: TSource | null = null

    for await (const value of source) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return singleValue as TSource
}
