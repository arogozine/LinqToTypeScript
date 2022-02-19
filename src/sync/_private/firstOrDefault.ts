export const firstOrDefault = <TSource>(
    source: Iterable<TSource>, predicate?: (x: TSource) => boolean): TSource | null => {
    if (predicate) {
        return firstOrDefault2(source, predicate)
    } else {
        return firstOrDefault1(source)
    }
}

const firstOrDefault1 = <T>(source: Iterable<T>): T | null => {
    const first = source[Symbol.iterator]().next()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return first.value || null
}

const firstOrDefault2 = <T>(source: Iterable<T>, predicate: (x: T) => boolean): T | null => {
    for (const value of source) {
        if (predicate(value) === true) {
            return value
        }
    }

    return null
}
