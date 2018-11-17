export function lastOrDefault<TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean): TSource | null {

    if (predicate) {
        return lastOrDefault_2(source, predicate)
    } else {
        return lastOrDefault_1(source)
    }
}

function lastOrDefault_1<TSource>(source: Iterable<TSource>): TSource | null {
    let last: TSource | null = null

    for (const value of source) {
        last = value
    }

    return last
}

function lastOrDefault_2<TSource>(
    source: Iterable<TSource>,
    predicate: (x: TSource) => boolean): TSource | null {

    let last: TSource | null = null

    for (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}
