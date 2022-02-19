import { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const each = <TSource>(
    source: Iterable<TSource>, action: (x: TSource) => void): IEnumerable<TSource> => {
    function *generator() {
        for (const value of source) {
            action(value)
            yield value
        }
    }

    return new BasicEnumerable(generator)
}
