import { ErrorString, InvalidOperationException } from "../../shared"

export const singleOrDefault = <TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null => {

    if (predicate) {
        return singleOrDefault2(source, predicate)
    } else {
        return singleOrDefault1(source)
    }
}

const singleOrDefault1 = <TSource>(source: Iterable<TSource>): TSource | null => {
    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (hasValue === true) {
            throw new InvalidOperationException(ErrorString.MoreThanOneElement)
        } else {
            hasValue = true
            singleValue = value
        }
    }

    return singleValue
}

const singleOrDefault2 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null => {

    let hasValue = false
    let singleValue: TSource | null = null

    for (const value of source) {
        if (predicate(value)) {
            if (hasValue === true) {
                throw new InvalidOperationException(ErrorString.MoreThanOneMatchingElement)
            } else {
                hasValue = true
                singleValue = value
            }
        }
    }

    return singleValue
}
