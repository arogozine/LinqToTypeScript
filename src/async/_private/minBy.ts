import { ErrorString, InvalidOperationException } from "../../shared"

export const minBy = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => number): Promise<TSource> => {
    let minValue: number | null = null
    let minItem: TSource | null = null
    for await (const item of source) {
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
