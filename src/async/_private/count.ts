export const count = <TSource>(source: AsyncIterable<TSource>, predicate?: (x: TSource) => boolean): Promise<number> => {
    if (predicate) {
        return count2(source, predicate)
    } else {
        return count1(source)
    }
}

const count1 = async <T>(source: AsyncIterable<T>) => {
    let total = 0

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const _ of source) {
        total++
    }

    return total
}

const count2 = async <T>(source: AsyncIterable<T>, predicate: (x: T) => boolean) => {
    let total = 0
    for await (const value of source) {
        if (predicate(value) === true) {
            total++
        }
    }
    return total
}
