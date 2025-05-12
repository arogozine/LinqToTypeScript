import { ErrorString, InvalidOperationException } from "../../shared"

export const minBy = <TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => number): TSource => {
    let minValue: number | null = null
    let minItem: TSource | null = null
    for (const item of source) {
        const itemValue = selector(item)
        if (minValue === null || itemValue < minValue) {
            minValue = itemValue
            minItem = item
        }
    }

    if (minItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return minItem
    }
}
