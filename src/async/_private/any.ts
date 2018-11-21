export function any<TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<boolean> {
    if (predicate) {
        return any_2(source, predicate)
    } else {
        return any_1(source)
    }
}

async function any_1<TSource>(source: AsyncIterable<TSource>): Promise<boolean> {
    for await (const _ of source) {
        return true
    }

    return false
}

async function any_2<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<boolean> {
    for await (const item of source) {
        if (predicate(item) === true) {
            return true
        }
    }

    return false
}
