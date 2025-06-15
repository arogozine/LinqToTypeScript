import { ErrorString, InvalidOperationException } from "../../shared"

export const maxBy = <TSource>(
    source: Iterable<TSource>,
    selector: (x: TSource) => number): TSource => {
    let maxValue: number | null = null
    let maxItem: TSource | null = null
    for (const item of source) {
        const itemValue = selector(item)
        if (maxValue === null || itemValue > maxValue) {
            maxValue = itemValue
            maxItem = item
        }
    }

    if (maxItem === null) {
        throw new InvalidOperationException(ErrorString.NoElements)
    } else {
        return maxItem
    }
}
