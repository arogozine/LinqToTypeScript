export function elementAtOrDefault<TSource>(source: Iterable<TSource>, index: number): TSource | null {
    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    return null
}
