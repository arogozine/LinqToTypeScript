export const partition = async <TSource>(
    source: AsyncIterable<TSource>, predicate: (x: TSource) => boolean): Promise<[pass: TSource[], fail: TSource[]]> => {
    const fail: TSource[] = []
    const pass: TSource[] = []

    for await (const value of source) {
        if (predicate(value) === true) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [pass, fail]
}
