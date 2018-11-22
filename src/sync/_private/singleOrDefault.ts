import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * @throws {InvalidOperationException} More than one element
 */
export function singleOrDefault<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null {

    if (predicate) {
        return singleOrDefault_2(source, predicate)
    } else {
        return singleOrDefault_1(source)
    }
}

function singleOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
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

function singleOrDefault_2<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null {

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
