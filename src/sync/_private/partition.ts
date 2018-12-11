// TODO - Async and Parallel Implementations

/**
 * Paritions the Iterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Pass / Fail condition
 */
export function partition<TSource>(source: Iterable<TSource>,
                                   predicate: (x: TSource) => boolean): [TSource[], TSource[]] {
    const fail: TSource[] = []
    const pass: TSource[] = []

    for (const value of source) {
        if (predicate(value) === true) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [fail, pass]
}
