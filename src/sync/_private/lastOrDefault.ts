/**
 * Returns the last element of a sequence.
 * If predicate is specified, the last element of a sequence that satisfies a specified condition.
 * @param source An Iterable<T> to return the last element of.
 * @param predicate A function to test each element for a condition. Optional.
 * @returns The value at the last position in the source sequence
 * or the last element in the sequence that passes the test in the specified predicate function.
 */
export function lastOrDefault<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null {

    if (predicate) {
        return lastOrDefault2(source, predicate)
    } else {
        return lastOrDefault1(source)
    }
}

const lastOrDefault1 = <TSource>(source: Iterable<TSource>): TSource | null => {
    let last: TSource | null = null

    for (const value of source) {
        last = value
    }

    return last
}

const lastOrDefault2 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null => {

    let last: TSource | null = null

    for (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}
