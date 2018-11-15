export function count<TSource>(source: Iterable<TSource>, predicate?: (x: TSource) => boolean): number {
    if (predicate) {
        return count_2(source, predicate)
    } else {
        return count_1(source)
    }
}

function count_1<T>(source: Iterable<T>): number {
    // tslint:disable-next-line:no-shadowed-variable
    let count = 0

    for (const _ of source) {
        count++
    }

    return count
}

function count_2<T>(source: Iterable<T>, predicate: (x: T) => boolean): number {
    // tslint:disable-next-line:no-shadowed-variable
    let count = 0
    for (const value of source) {
        if (predicate(value) === true) {
            count++
        }
    }
    return count
}
