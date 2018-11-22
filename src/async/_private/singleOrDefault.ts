import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

export function singleOrDefault<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return singleOrDefault_2(source, predicate)
    } else {
        return singleOrDefault_1(source)
    }
}

export async function singleOrDefault_1<TSource>(source: AsyncIterable<TSource>): Promise<TSource | null> {
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

    return singleValue
}

export async function singleOrDefault_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<TSource | null> {

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

    return singleValue
}
