import { BasicEnumerable } from "../BasicEnumerable"

export const defaultIfEmpty = <TSource>(source: Iterable<TSource>, defaultValue: TSource) => {
    function* generator() {
        let found = false
        for (const value of source) {
            found = true
            yield value
        }

        if (!found) {
            yield defaultValue
        }
    }

    return new BasicEnumerable(generator)
}