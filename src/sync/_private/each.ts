import { BasicEnumerable } from "../BasicEnumerable"
import { IEnumerable } from "../IEnumerable"

export function each<TSource>(source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource> {
    function *generator() {
        for (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicEnumerable(generator)
}
