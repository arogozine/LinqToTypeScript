export const firstOrDefault = <TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> => {
    if (predicate) {
        return firstOrDefault2(source, predicate)
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return firstOrDefault1(source)
    }
}

const firstOrDefault1 = async <T>(source: AsyncIterable<T>) => {
    const first = await source[Symbol.asyncIterator]().next()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return first.value || null
}

const firstOrDefault2 = async <T>(
    source: AsyncIterable<T>, predicate: (x: T) => boolean) => {
    for await (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}
