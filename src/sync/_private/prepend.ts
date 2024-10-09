import type { IEnumerable } from "../../types"
import { BasicEnumerable } from "../BasicEnumerable"

export const prepend = <TSource>(source: Iterable<TSource>, element: TSource): IEnumerable<TSource> => {
    function* iterator() {
        yield element
        yield* source
    }

    return new BasicEnumerable(iterator)
}
