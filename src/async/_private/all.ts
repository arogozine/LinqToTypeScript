export const all = async <TSource>(
    source: AsyncIterable<TSource>,
    predicate: (x: TSource) => boolean): Promise<boolean> => {
    for await (const item of source) {
        if (predicate(item) === false) {
            return false
        }
    }

    return true
}
