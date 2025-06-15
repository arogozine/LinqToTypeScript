import { ErrorString, InvalidOperationException } from "../../shared"

export const maxBy = async <TSource>(
    source: AsyncIterable<TSource>,
    selector: (x: TSource) => number): Promise<TSource> => {
    let maxValue: number | null = null
    let maxItem: TSource | null = null
    for await (const item of source) {
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
