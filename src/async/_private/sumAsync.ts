export const sumAsync = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<number> => {
    let sum = 0
    for await (const value of source) {
        sum += await selector(value)
    }

    return sum
}
