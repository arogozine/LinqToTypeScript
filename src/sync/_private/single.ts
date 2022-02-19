import { ErrorString, InvalidOperationException } from "../../shared"

export const single = <TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource => {
    if (predicate) {
        return single2(source, predicate)
    } else {
        return single1(source)
    }
}

const single1 = <TSource>(source: Iterable<TSource>): TSource => {
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

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoElements)
    }

    return singleValue as TSource
}

const single2 = <TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource => {
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

    if (hasValue === false) {
        throw new InvalidOperationException(ErrorString.NoMatch)
    }

    return singleValue as TSource
}
