export const partitionAsync = async <TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => Promise<boolean>): Promise<[pass: TSource[], fail: TSource[]]> => {
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
