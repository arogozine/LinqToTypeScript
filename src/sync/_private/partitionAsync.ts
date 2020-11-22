/**
 * Paritions the Iterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Async Pass / Fail condition
 * @returns Promise of [pass, fail]
 */
export const partitionAsync = async <TSource>(
    source: Iterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<[TSource[], TSource[]]> => {
    const fail: TSource[] = []
    const pass: TSource[] = []

    for (const value of source) {
        if (await predicate(value) === true) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [pass, fail]
}
