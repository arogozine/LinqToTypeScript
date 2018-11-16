import { ArgumentOutOfRangeException } from "../../shared/TypesAndHelpers"

/**
 * Returns Element at specified position
 * @throws {ArgumentOutOfRangeException} Index outside of iteration
 * @param source Iteration of Elements
 * @param index Index for Element
 */
export function elementAt<TSource>(source: Iterable<TSource>, index: number): TSource {
    if (index < 0) {
        throw new ArgumentOutOfRangeException("index")
    }

    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    throw new ArgumentOutOfRangeException("index")
}
