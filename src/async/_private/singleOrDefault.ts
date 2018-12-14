import { ErrorString } from "../../shared/ErrorString"
import { InvalidOperationException } from "../../shared/InvalidOperationException"

/**
 * If predicate is specified returns the only element of a sequence that satisfies a specified condition,
 * ootherwise returns the only element of a sequence. Returns a default value if no such element exists.
 * @param source An AsyncIterable<T> to return a single element from.
 * @param predicate A function to test an element for a condition. Optional.
 * @throws {InvalidOperationException}
 * If predicate is specified more than one element satisfies the condition in predicate,
 * otherwise the input sequence contains more than one element.
 * @returns The single element of the input sequence that satisfies the condition,
 * or null if no such element is found.
 */
export function singleOrDefault<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return singleOrDefault_2(source, predicate)
    } else {
        return singleOrDefault_1(source)
    }
}

async function singleOrDefault_1<TSource>(source: AsyncIterable<TSource>): Promise<TSource | null> {
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

async function singleOrDefault_2<TSource>(
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
