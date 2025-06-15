import { ErrorString, InvalidOperationException } from "../../shared"

export const minByAsync = async <TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => Promise<number>): Promise<TSource> => {
    let minValue: number | null = null
    let minItem: TSource | null = null
    for (const item of source) {
        const itemValue = await selector(item)
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
