export const partition = <TSource>(source: Iterable<TSource>,
                                   predicate: (x: TSource) => boolean): [pass: TSource[], fail: TSource[]] => {
    const fail: TSource[] = []
    const pass: TSource[] = []

    for (const value of source) {
        if (predicate(value) === true) {
            pass.push(value)
        } else {
            fail.push(value)
        }
    }

    return [pass, fail]
}
