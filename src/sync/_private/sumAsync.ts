export const sumAsync = async <TSource>(
    source: Iterable<TSource>, selector: (x: TSource) => Promise<number>): Promise<number> => {
    let sum = 0
    for (const value of source) {
        sum += await selector(value)
    }

    return sum
}
