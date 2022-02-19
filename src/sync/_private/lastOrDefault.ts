export const lastOrDefault = <TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null => {

    if (predicate) {
        return lastOrDefault2(source, predicate)
    } else {
        return lastOrDefault1(source)
    }
}

const lastOrDefault1 = <TSource>(source: Iterable<TSource>): TSource | null => {
    let last: TSource | null = null

    for (const value of source) {
        last = value
    }

    return last
}

const lastOrDefault2 = <TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null => {

    let last: TSource | null = null

    for (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}
