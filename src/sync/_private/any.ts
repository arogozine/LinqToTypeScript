export const any = <TSource>(
    source: Iterable<TSource>,
    predicate?: (x: TSource) => boolean) => {
    if (predicate) {
        return any2(source, predicate)
    } else {
        return any1(source)
    }
}

const any1 = <TSource>(source: Iterable<TSource>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of source) {
        return true
    }

    return false
}

const any2 = <TSource>(source: Iterable<TSource>, predicate: (x: TSource) => boolean) => {
    for (const item of source) {
        if (predicate(item) === true) {
            return true
        }
    }

    return false
}
