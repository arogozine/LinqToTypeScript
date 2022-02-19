export const any = <TSource>(
    source: AsyncIterable<TSource>,
    predicate?: (x: TSource) => boolean): Promise<boolean> => {
    if (predicate) {
        return any2(source, predicate)
    } else {
        return any1(source)
    }
}

const any1 = async <TSource>(source: AsyncIterable<TSource>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of source) {
        return true
    }

    return false
}

const any2 = async <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean) => {
    for await (const item of source) {
        if (predicate(item) === true) {
            return true
        }
    }

    return false
}
