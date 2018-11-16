export function partition<TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean): TSource[][] {
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
