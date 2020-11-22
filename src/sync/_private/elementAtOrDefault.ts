/**
 * Returns the element at a specified index in a sequence or a default value if the index is out of range.
 * @param source An IEnumerable<T> to return an element from.
 * @param index The zero-based index of the element to retrieve.
 * @returns
 * null if the index is outside the bounds of the source sequence;
 * otherwise, the element at the specified position in the source sequence.
 */
export const elementAtOrDefault = <TSource>(source: Iterable<TSource>, index: number): TSource | null => {
    let i = 0
    for (const item of source) {
        if (index === i++) {
            return item
        }
    }

    return null
}
