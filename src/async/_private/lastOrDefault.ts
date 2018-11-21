export async function lastOrDefault<TSource>(
    source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<TSource | null> {

    if (predicate) {
        return lastOrDefault_2(source, predicate)
    } else {
        return lastOrDefault_1(source)
    }
}

async function lastOrDefault_1<T>(source: AsyncIterable<T>): Promise<T | null> {
    let last: T | null = null

    for await (const value of source) {
        last = value
    }

    return last
}

async function lastOrDefault_2<T>(
    source: AsyncIterable<T>, predicate: (x: T) => boolean): Promise<T | null> {

    let last: T | null = null

    for await (const value of source) {
        if (predicate(value) === true) {
            last = value
        }
    }

    return last
}
