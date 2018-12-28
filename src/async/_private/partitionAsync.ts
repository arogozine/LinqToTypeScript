/**
 * Paritions the Iterable<T> into a tuple of failing and passing arrays
 * based on the predicate.
 * @param source Elements to Partition
 * @param predicate Pass / Fail async condition
 * @returns [pass, fail]
 */
export const partitionAsync = async <TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<[TSource[], TSource[]]> => {
    const fail: TSource[] = []
    const pass: TSource[] = []

    for await (const value of source) {
        if (await predicate(value) === true) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [pass, fail]
}
