export const lastOrDefault = <TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> => {

    if (predicate) {
        return lastOrDefault2(source, predicate)
    } else {
        return lastOrDefault1(source)
    }
}

const lastOrDefault1 = async <T>(source: AsyncIterable<T>) => {
    let last: T | null = null

    for await (const value of source) {
        last = value
    }

    return last
}

const lastOrDefault2 = async <T>(
    source: AsyncIterable<T>, predicate: (x: T) => boolean) => {

    let last: T | null = null

    for await (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}
